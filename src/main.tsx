import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryUI from "src/fallback-ui/errorboundary.ui.tsx";

import { MantineProvider, createEmotionCache } from "@mantine/core";
const myCache = createEmotionCache({ key: 'mantine', prepend: false });

import { Notifications, notifications } from "@mantine/notifications";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => {
          notifications.show({
            title: 'Error !',
            message: error,
            autoClose: false,
            withBorder: true,
            withCloseButton: true,
            color: 'red'
          })
          return <ErrorBoundaryUI error={error} resetHandler={resetErrorBoundary} />
        }}>
          <MantineProvider withCSSVariables withNormalizeCSS withGlobalStyles emotionCache={myCache}>
            <Notifications />
            <App />
          </MantineProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
