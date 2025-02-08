import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Products from "./pages/Products";
import UpdateProduct from "./pages/UpdateProduct";
import CreateProduct from "./pages/CreateProduct";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path={`/product/create`} element={<CreateProduct />} />
        <Route path={`/product/:id`} element={<UpdateProduct />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
