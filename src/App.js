import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./app.scss"
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Order from "./pages/Order/Order";
const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />

    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/product/:*",
        element: <PageNotFound />,
      },

    ],
  },
])

function App() {

  // const Layout = () => {
  //   <>
  //     <Navbar />
  //     <Footer />
  //     <Outlet />
  //   </>
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={(
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            )}
          >
            <Route exact path='/' element={<Home />} />
            <Route exact path="/products/:id" element={<Products />} />
            <Route exact path='/product/:id' element={<Product />} />
            <Route exact path='/order' element={<Order/>} />
          </Route>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route path="/*" element={<Navigate to="/" replace />} />
          {/* <Route path="*" element={ <PageNotFound />} /> */}
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
