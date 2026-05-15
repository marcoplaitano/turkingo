import Navbar from './NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Title from './Title';
import { lazy, Suspense } from "react";

const PageHome = lazy(() => import("./PageHome.tsx"));
const PageScores = lazy(() => import("./PageScores.tsx"));
const PageLearn = lazy(() => import("./PageLearn.tsx"));
const PageAbout = lazy(() => import("./PageAbout.tsx"));

export default function App() {
  return (
    <>
      <Title />
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<main>Loading...</main>}>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/scores/" element={<PageScores />} />
            <Route path="/learn/" element={<PageLearn />} />
            <Route path="/about/" element={<PageAbout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
