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

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

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
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
              <MantineProvider withCSSVariables withNormalizeCSS withGlobalStyles emotionCache={myCache}>
                <Notifications />
                <App />
              </MantineProvider>
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
