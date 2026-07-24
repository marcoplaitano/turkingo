import Navbar from './Elements/Navbar.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { DB_CLIENT, DB_TABLE_NAME, LanguageItemData, type RawItem } from './globals.tsx';
import Loader from './Elements/Loader.tsx';
import ErrorComponent from './Elements/ErrorComponent.tsx';

const PageExercise = lazy(() => import("./Pages/PageExercise.tsx"));
const PageLearn = lazy(() => import("./Pages/PageLearn.tsx"));
const PageAbout = lazy(() => import("./Pages/PageAbout.tsx"));

export default function App() {
  const [streakTitle, setStreakTitle] = useState<number>(0);
  const [data, setData] = useState<LanguageItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ── Data loading ──────────────────────────────────────────────────────────

  const loadData = useCallback(async () => {
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
  }, [DB_CLIENT]);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <BrowserRouter>
        <Navbar streakTitle={streakTitle} />
        <Suspense fallback={<main></main>}>
          <Routes>
            {!loadError && !loading && <Route path="/" element={<PageExercise setStreakTitle={setStreakTitle} data={data} />} />}
            {!loadError && !loading && <Route path="/learn/" element={<PageLearn data={data} setData={setData} />} />}
            <Route path="/about/" element={<PageAbout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {loadError && <ErrorComponent message="Failed to load data!" details={loadError} />}
      {loading && <Loader text="Loading data..." />}
    </>
  );
}
