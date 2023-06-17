// import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "fallback-ui/spinner.ui";
import ErrorBoundaryUI from "fallback-ui/errorboundary.ui";
import DefaultLayout from "layout/default.layout";
import ContactScreen from "screens/contact.screen";
import BrowsePerformance from "screens/browser.performance.screen";
import BookPerformance from "screens/book.performance.screen";

const MainScreenApp = lazy(() => import("screens/main.screen"))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<MainScreenApp />} />
          <Route path="/browse-performance" element={<BrowsePerformance />} />
          <Route path="/browse-performance/booking" element={<BookPerformance />} />
          <Route path="/contact-us" element={<ContactScreen />} />
          <Route path="/not-found" element={<ErrorBoundaryUI />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
