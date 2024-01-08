import { lazy } from "react";


const Home = lazy(() => import("../pages/Home.jsx"));

const About = lazy(() => import("../pages/About/About.jsx"));

const CreateItemScreen = lazy(() =>
  import("../pages/CreateItemScreen/CreateItemScreen.jsx")
);

const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage.jsx"));

const FingerPrint = lazy(() => import("../pages/FingerPrint.jsx"));

const ItemDetailScreen = lazy(() =>
  import("../pages/ItemDetailScreen/ItemDetailScreen.jsx")
);

const EditItemDetailScreen = lazy(() =>
  import("../pages/EditItemDetailScreen/EditItemDetailScreen.jsx")
);


export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
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


export const privateRoutes = [];
