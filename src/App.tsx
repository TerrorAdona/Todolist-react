import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import About from "./pages/About";

export default function App() {
  // Récupère la localisation actuelle pour animer chaque changement de page
  const location = useLocation();

  return (
    <>
      {/* 🌿 Menu de navigation */}
      <div className="flex justify-center p-2">
        <ul className="menu menu-horizontal bg-base-200 rounded-box p-2 justify-center gap-2 mb-5 shadow-md">
          {/* Accueil */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white rounded-lg" : ""
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 rounded-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </NavLink>
          </li>

          {/* Page Todo */}
          <li>
            <NavLink
              to="/todo"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white rounded-lg" : ""
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </NavLink>
          </li>

          {/* À propos */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white rounded-lg" : ""
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* 🌸 Texte de bienvenue */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Bienvenue sur ton espace React ✨
        </h1>
        <p className="text-base text-gray-600">
          Navigue librement entre tes pages sans recharger la page — la magie du
          SPA (Single Page Application) 🌿
        </p>
      </div>

      {/* 🌈 Transitions de pages avec Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="p-4"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

    </>
  );
}
