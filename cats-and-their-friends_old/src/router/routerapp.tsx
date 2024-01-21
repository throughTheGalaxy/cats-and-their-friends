import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Kolontikyl } from "../components/Kolonticyl/Kolonticyl";
import { publicRoutes, privateRoutes } from "./routerindex";


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
