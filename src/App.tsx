import Navbar from './Elements/Navbar.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const PageHome = lazy(() => import("./Pages/PageHome.tsx"));
const PageScores = lazy(() => import("./Pages/PageScores.tsx"));
const PageLearn = lazy(() => import("./Pages/PageLearn.tsx"));
const PageAbout = lazy(() => import("./Pages/PageAbout.tsx"));

export default function App() {
  const [streak, setStreak] = useState<number>(0);

  return (
    <>
      <BrowserRouter>
        <Navbar streak={streak} />
        <Suspense fallback={<main></main>}>
          <Routes>
            <Route path="/"         element={<PageHome setStreak={setStreak} />} />
            <Route path="/scores/"  element={<PageScores />} />
            <Route path="/learn/"   element={<PageLearn />} />
            <Route path="/about/"   element={<PageAbout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
