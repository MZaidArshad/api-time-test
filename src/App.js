import React, { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import EditDoc from "./pages/dashboard/edit/EditDoc";
import { SelectedDocProvider } from "./context/SelectedDocContext";

function App() {
  return (
    <SelectedDocProvider>
      <div className="App">
        <Suspense
          fallback={
            <div
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ height: "100vh" }}
            >
              <CirclesWithBar
                height="100"
                width="100"
                color="#1492d8"
                outerCircleColor="#1492d8"
                innerCircleColor="#1492d8"
                barColor="#1492d8"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<EditDoc />} />
          </Routes>
        </Suspense>

        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </SelectedDocProvider>
  );
}

export default App;
