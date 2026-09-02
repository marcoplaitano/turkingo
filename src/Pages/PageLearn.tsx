import '../style/PageLearn.css'

import { useState } from "react";
import { DB_CLIENT, DB_TABLE_NAME, LanguageItemData, normalizeTurkish } from "../globals";
import type { RawItem, ItemType } from "../globals";
import { useToast } from "../Elements/Toast.tsx";
import ErrorComponent from '../Elements/ErrorComponent.tsx';
import Loader from '../Elements/Loader.tsx';


// ── Helpers ──────────────────────────────────────────────────────────────────

function matchesSearch(query: string, item: LanguageItemData): boolean {
  if (!query) return false;
  const en = normalizeTurkish(item.getLanguageEN().toLowerCase());
  const tr = normalizeTurkish(item.getLanguageTR().toLowerCase());
  return en.includes(query) || tr.includes(query);
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const normalizedText = normalizeTurkish(text.toLowerCase());
  const normalizedQuery = normalizeTurkish(query.toLowerCase());

  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return text;

  const start = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const end = text.substring(index + query.length);

  return (
    <>{start}<mark>{match}</mark>{end}</>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

interface ItemTableProps {
  items: LanguageItemData[];
  query: string;
}

function ItemTable({ items, query }: ItemTableProps) {
  if (query.length === 0) return null;

  const results = items.filter((item) => matchesSearch(query, item));

  if (results.length === 0)
    return <p id="no-results-p">No results.</p>;

  return (
    <section className="section">
      <div className="list-wrapper">
        <table>
          <thead>
            <tr>
              <th>English</th>
              <th>Turkish</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, i) => (
              <tr key={i} className="entry">
                <td className="l-en">{highlightMatch(item.getLanguageEN(), query)}</td>
                <td className="l-tr">{highlightMatch(item.getLanguageTR(), query)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface PropsPageLearn {
  data: LanguageItemData[];
  setData: (data: LanguageItemData[]) => void;
}

export default function PageLearn({ data, setData }: PropsPageLearn) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [inputEN, setInputEN] = useState("");
  const [inputTR, setInputTR] = useState("");
  const [itemType, setItemType] = useState<ItemType | null>(null);

  const [query, setQuery] = useState("");

  // ── Data loading ──────────────────────────────────────────────────────────

  // Used to reload DB table after insertion of new element.
  async function loadData() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await DB_CLIENT.from(DB_TABLE_NAME).select("*", { count: "exact" }).order("id", { ascending: true });
      if (res.status !== 200)
        throw new Error(res.error?.message ?? "DB error");
      setData((res.data as RawItem[]).map((r) => new LanguageItemData(r)));
    } catch (err) {
      setLoadError(String(err));
    } finally {
      setLoading(false);
    }
  };

  // ── Add item ──────────────────────────────────────────────────────────────

  async function handleAdd() {
    const en = inputEN.trim().toLowerCase();
    const tr = inputTR.trim().toLowerCase();

    if (!itemType) {
      toast("Specify type!", "error");
      return;
    }
    if (!en || !tr) {
      toast("Missing data!", "error");
      return;
    }

    const alreadyExists = data.some(
      (d) => d.getLanguageEN() === en && d.getLanguageTR() === tr
    );
    if (alreadyExists) {
      toast("Already exists!", "error");
      return;
    }

    const id = (data.at(-1)?.getId() ?? 0) + 1;
    const item: RawItem = { id, "l-EN": en, "l-TR": tr, "type": itemType };
    const res = await DB_CLIENT.from(DB_TABLE_NAME).insert(item);
    if (res.status !== 201) {
      toast("Failed to add item!", "error");
      console.log("DB add error:", res.status, res.error);
      return;
    }
    toast(`Added ${itemType}`, "info");
    setInputEN("");
    setInputTR("");
    setItemType(null);
    await loadData();
  }

  // ── Filtered search ───────────────────────────────────────────────────────

  const normalizedQuery = normalizeTurkish(query.trim().toLowerCase());

  // ── Render ────────────────────────────────────────────────────────────────

  if (data.length === 0) {
    return (
      <ErrorComponent message="No input data!" details="Either the database is empty or it failed to load." />
    );
  }

  else if (loadError) {
    return (
      <ErrorComponent message="Failed to load data!" details={loadError} />
    )
  }
  else if (loading) {
    return (
      <Loader text="Loading data..." />
    );
  }

  return (
    <main>
      <article>

        <h2>Search data</h2>
        <div className="search-container">
          <input
            type="text"
            maxLength={40}
            placeholder="Type to start search..."
            autoComplete="off"
            id="search-input"
            value={query}
            disabled={loading}
            onChange={(e) => { setQuery(e.target.value); }}
            onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          />
          <ItemTable items={data} query={normalizedQuery} />
        </div>

        <h2>Add data</h2>
        <div className="add-item-container">
          <input
            type="text"
            id="input-en"
            placeholder="English..."
            autoComplete="off"
            value={inputEN}
            onChange={(e) => setInputEN(e.target.value)}
          />
          <input
            type="text"
            id="input-tr"
            placeholder="Turkish..."
            autoComplete="off"
            value={inputTR}
            onChange={(e) => setInputTR(e.target.value)}
          />
          <div className="radio-container">
            {(["word", "phrase", "sentence"] as ItemType[]).map((t) => (
              <label key={t} className="radio-item">
                <input
                  type="radio"
                  name="choice"
                  value={t}
                  checked={itemType === t}
                  onChange={() => setItemType(t)}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
          <button className="btn" id="btn-add" onClick={handleAdd}>Add</button>
        </div>

      </article>
    </main>
  );
}
