// React
import { Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import {
  ANALYZER_DATA_URL,
  CONFIG_TYPE,
  CV_DATA_URL,
  ILoaderData,
} from "./helpers/appHelper";
import axios from "axios";
import { SUPPORT_MATRIX_ROW_TYPE } from "./helpers/tableHelper";
import { CV_LANGUAGE_ROW } from "./helpers/cvHelper";

function App() {
  // Store
  const { initDone, setInitDone } = useStore();
  const { setLangCode } = useStore();

  //
  // Loaders
  //

  // cvLanguages
  const loadCvLanguages = async (): Promise<CV_LANGUAGE_ROW[]> => {
    const url = `${CV_DATA_URL}/$cv_languages.json`;
    return await axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        return response.data.data;
      });
  };

  // analyzerConfig
  const loadConfig = async (): Promise<CONFIG_TYPE> => {
    const url = `${ANALYZER_DATA_URL}/$config.json`;
    return await axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        return response.data.data[0];
      });
  };

  // supportMatrix & matrixLoaded
  const loadMatrix = async (): Promise<SUPPORT_MATRIX_ROW_TYPE[]> => {
    const url = `${ANALYZER_DATA_URL}/$support_matrix.json`;
    return await axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        return response.data.data;
      });
  };

  const appLoader = async () => {
    const [cvLanguages, analyzerConfig, supportMatrix] = await Promise.all([
      loadCvLanguages(),
      loadConfig(),
      loadMatrix(),
    ]);
    const loaderData: ILoaderData = {
      cvLanguages: cvLanguages,
      analyzerConfig: analyzerConfig,
      supportMatrix: supportMatrix,
    };
    return loaderData;
  };

  // Makes sure all common data is ready in all routes.
  // Specific Dataset related info is loaded in examine pages
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppUI />,
      loader: appLoader,
      children: [
        {
          path: "/",
          index: true,
          element: <HomePage />,
          loader: appLoader,
        },
        {
          path: "browse",
          element: <BrowsePage />,
          loader: appLoader,
        },
        {
          path: "examine/:lc/:ver",
          element: <ExaminePage />,
          loader: appLoader,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  // UI language
  useEffect(() => {
    if (!initDone) {
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
      <RouterProvider router={router} />
    </Suspense>
  ); // return
} // App

export default App;
