import Home from "./pages/Home";
import Details from "./pages/Details";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <Details />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
