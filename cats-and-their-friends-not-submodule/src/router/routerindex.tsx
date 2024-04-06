import { lazy } from "react";
import type { IRoute } from "../types";


const Home = lazy(() => import("../pages/Home"));

const About = lazy(() => import("../pages/About/About"));

const CreateItemScreen = lazy(
  () => import("../pages/CreateItemScreen/CreateItemScreen")
);

const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

const FingerPrint = lazy(() => import("../pages/FingerPrint"));

const ItemDetailScreen = lazy(
  () => import("../pages/ItemDetailScreen/ItemDetailScreen")
);

const EditItemDetailScreen = lazy(
  () => import("../pages/EditItemDetailScreen/EditItemDetailScreen")
);

const LogInPage = lazy(() => import("../pages/LogIn/Login"));

// пути для всех

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/product/:id",
    element: <ItemDetailScreen />,
  },
  {
    path: "/editproduct/:id",
    element: <EditItemDetailScreen />,
  },
  {
    path: "/addnewproduct",
    element: <CreateItemScreen />,
  },
  {
    path: "/fingerprint",
    element: <FingerPrint />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];


export const privateRoutes: IRoute[] = [];
