import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  AnimatePresence,
} from "framer-motion";

import {
  MatchProvider,
} from "./context/MatchContext";

import Dashboard
from "./pages/Dashboard";

import AdminPanel
from "./pages/AdminPanel";

import Overlay
from "./pages/Overlay";

import Login
from "./pages/Login";

import MatchSetup
from "./pages/MatchSetup";

import Settings
from "./pages/Settings";

import Players
from "./pages/Players";

import "./index.css";

export default function App() {

  return (

    <MatchProvider>

      <BrowserRouter>

        <AnimatePresence
          mode="wait"
        >

          <Routes>

            {/* DASHBOARD */}

            <Route

              path="/"

              element={
                <Dashboard />
              }

            />

            {/* LOGIN */}

            <Route

              path="/login"

              element={
                <Login />
              }

            />

            {/* MATCH SETUP */}

            <Route

              path="/match"

              element={
                <MatchSetup />
              }

            />

            {/* PLAYERS */}

            <Route

              path="/players"

              element={
                <Players />
              }

            />

            {/* ADMIN PANEL */}

            <Route

              path="/admin"

              element={
                <AdminPanel />
              }

            />

            {/* LIVE OVERLAY */}

            <Route

              path="/overlay"

              element={
                <Overlay />
              }

            />

            {/* SETTINGS */}

            <Route

              path="/settings"

              element={
                <Settings />
              }

            />

            {/* 404 PAGE */}

            <Route

              path="*"

              element={
                <Navigate
                  to="/"
                  replace
                />
              }

            />

          </Routes>

        </AnimatePresence>

      </BrowserRouter>

    </MatchProvider>

  );

}