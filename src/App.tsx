import Navbar from './Elements/Navbar.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const PageHome = lazy(() => import("./Pages/PageHome.tsx"));
const PageScores = lazy(() => import("./Pages/PageScores.tsx"));
const PageLearn = lazy(() => import("./Pages/PageLearn.tsx"));
const PageAbout = lazy(() => import("./Pages/PageAbout.tsx"));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<main></main>}>
          <Routes>
            <Route path="/"         element={<PageHome />} />
            <Route path="/scores/"  element={<PageScores />} />
            <Route path="/learn/"   element={<PageLearn />} />
            <Route path="/about/"   element={<PageAbout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
