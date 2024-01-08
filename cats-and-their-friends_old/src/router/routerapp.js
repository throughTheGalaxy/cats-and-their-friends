import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Kolontikyl } from "../components/Kolonticyl/Kolonticyl.jsx";
import { publicRoutes, privateRoutes } from "./routerindex";

// Um das Schreiben von viel Code zu vermeiden, gehen wir durch das vorbereitete Array von Pfaden und erstellen einen Pfad, indem wir der Komponente einen Pfad und eine Komponente (Seite) geben

export const RouterApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet></Outlet>
            <Kolontikyl />
          </>
        }
        errorElement={<p>error page</p>}
      >
        {[...publicRoutes, ...privateRoutes].map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
