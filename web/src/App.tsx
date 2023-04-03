// React
import { Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  useParams,
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
import {
  DATASET_INFO_ROW_TYPE,
  REPORTED_STATS_ROW_TYPE,
  SUPPORT_MATRIX_ROW_TYPE,
  TEXT_CORPUS_STATS_ROW_TYPE,
} from "./helpers/tableHelper";
import { CV_LANGUAGE_ROW } from "./helpers/cvHelper";

function App() {
  // Store
  const { initDone, setInitDone } = useStore();
  const { setLangCode } = useStore();
  let { lc, ver } = useParams();

  //
  // Loaders
  //
  interface IResponse {
    data: any[];
    schema: any;
  }
  const doAxios = async (url: string) => {
    return await axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        return response.data.data;
      })
      .catch((err) => {
        console.error("ERROR - Could not load:", url);
        console.error(err);
        return null;
      });
  };

  // cvLanguages
  const loadCvLanguages = async () => {
    const url = `${CV_DATA_URL}/$cv_languages.json`;
    return await doAxios(url);
  };

  // analyzerConfig
  const loadConfig = async () => {
    const url = `${ANALYZER_DATA_URL}/$config.json`;
    return await doAxios(url);
  };

  // supportMatrix & matrixLoaded
  const loadMatrix = async () => {
    const url = `${ANALYZER_DATA_URL}/$support_matrix.json`;
    return await doAxios(url);
  };

  // textCorpusStats
  const loadTextCorpusStats = async () => {
    const url = `${ANALYZER_DATA_URL}/$text_corpus_stats.json`;
    return await doAxios(url);
  };

  // textCorpusStats
  const loadReportedSentencesStats = async () => {
    const url = `${ANALYZER_DATA_URL}/$reported.json`;
    return await doAxios(url);
  };

  // Loader common to all pages
  const commonLoader = async () => {
    const [
      cvLanguages,
      analyzerConfig,
      supportMatrix,
      textCorpusStats,
      reportedSentencesStats,
    ] = await Promise.all([
      loadCvLanguages(),
      loadConfig(),
      loadMatrix(),
      loadTextCorpusStats(),
      loadReportedSentencesStats(),
    ]);
    const loaderData: ILoaderData = {
      cvLanguages: cvLanguages,
      analyzerConfig: analyzerConfig ? analyzerConfig[0] : null,
      supportMatrix: supportMatrix,
      textCorpusStats: textCorpusStats,
      reportedSentencesStats: reportedSentencesStats,
    };
    return loaderData;
  };

  // Makes sure all common data is ready in all routes.
  // Specific Dataset related info is loaded in examine pages
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppUI />,
      loader: commonLoader,
      children: [
        {
          path: "/",
          index: true,
          element: <HomePage />,
          loader: commonLoader,
        },
        {
          path: "browse",
          element: <BrowsePage />,
          loader: commonLoader,
        },
        {
          path: "examine/:lc/:ver",
          element: <ExaminePage />,
          loader: commonLoader,
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
