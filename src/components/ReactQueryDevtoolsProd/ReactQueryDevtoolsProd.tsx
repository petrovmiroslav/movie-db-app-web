import React, { useEffect } from "react";
import { config } from "../../constants/config";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

// toggleReactQueryDevtools() in devTools console to toggle React Query Devtools

export const ReactQueryDevtoolsProd = () => {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    window.toggleReactQueryDevtools = () => setShowDevtools((old) => !old);
  }, []);

  useEffect(() => {
    if (!config.IS_DEV) return;
    setShowDevtools(config.REACT_QUERY_DEVTOOLS_INITIAL_OPEN);
  }, []);

  return showDevtools ? (
    <React.Suspense fallback={null}>
      <ReactQueryDevtoolsProduction />
    </React.Suspense>
  ) : null;
};
