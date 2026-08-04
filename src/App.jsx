import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Notes from "./pages/Notes";
import About from "./pages/About";
import Contact from "./pages/Contact";

const TITLES = {
  "/": "builtbymostafaK© — Creative Studio",
  "/work": "Inside the Work — builtbymostafaK©",
  "/services": "Work With Me — builtbymostafaK©",
  "/notes": "Field Notes — builtbymostafaK©",
  "/about": "About — builtbymostafaK©",
  "/contact": "Contact — builtbymostafaK©",
};

function NotFound() {
  return (
    <div className="bmk-404">
      <span className="mono bmk-eyebrow">404</span>
      <h1>This page hasn't been shaped yet.</h1>
      <p>The link you followed doesn't lead anywhere — but the work does.</p>
      <Link className="bmk-btn" to="/">
        Back to the studio
      </Link>
    </div>
  );
}

/* Restores scroll on navigation, and honours #case-slug links into the Work page. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function TitleManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] || "builtbymostafaK© — Creative Studio";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="bmk">
      <ScrollManager />
      <TitleManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
