// React
import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// i10n
import intl from "react-intl-universal";

// APP
import { uiLocaleInit, LanguageCodesType } from "./helpers/localeHelper";
import { useStore } from "./stores/store";

// UI
import { AppUI } from "./components/ui/ui";

// Pages
import { HomePage } from "./components/pages/home";
import { BrowsePage } from "./components/pages/browse";
import { ExaminePage } from "./components/pages/examine";

import "./App.css";

function App() {
  // Store
  const { initDone, setInitDone } = useStore();
  const { setLangCode } = useStore();

  useEffect(() => {
    // UI Language
    if (!initDone) {
      // i18n
      uiLocaleInit().then(() => {
        const { currentLocale } = intl.getInitOptions();
        setLangCode(currentLocale as LanguageCodesType);
        setInitDone(true);
      });
    }
  }, [initDone, setInitDone, setLangCode]);

  return !initDone ? (
    <></>
  ) : (
    <Suspense>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<AppUI />}>
            <Route index element={<HomePage />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="examine" element={<ExaminePage />} />
            {/* Error */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  ); // return
} // App

export default App;
