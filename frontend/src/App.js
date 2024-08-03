import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Product from "./Pages/Product";
import Ad from "./Pages/Ad";
import PostAd from "./Pages/PostAd";
import ProtectedRoute from "./utils/ProtectedRoute";

import Inspector from "./Pages/Inspector";

import Admin from "./Pages/Admin";
import ApprovePost from "./Admin/ApprovePost/ApprovePost";
import AdminNavbar from "./Admin/AdminNavbar/AdminNavbar";
import AllPost from "./Admin/AllPost/AllPost";
import MyPosts from "./Pages/MyPosts";
import PostDetail from "./Pages/PostDetail";
import UserLoginSignup from "./Pages/UserLoginSignup";
import InspectorLogin from "./Pages/InspectorLogin";
import AddInspector from "./Admin/AddInspector/AddInspector";
import InspectPost from "./Pages/InspectPost";
import Chat from "./Pages/Chat";
import Career from "./Pages/Career";
import CareerApplication from "./Admin/CareerApplication/CareerApplication";
import ManageInspector from "./Admin/ManageInspector/ManageInspector";
import EmailVerification from "./Pages/EmailVerification";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import InspectionRequests from "./Admin/InspectionRequest/InspectionRequest";
import InspectBuyerRequest from "./Pages/InspectBuyerRequest";

function App() {
  const userRole = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        {/* Conditional rendering of the navigation bar */}
        {window.location.pathname === "/admin" && userRole === "admin" ? (
          <AdminNavbar />
        ) : (
          <Navbar />
        )}

        {/* const userRole = window.location.pathname.startsWith("/inspector") */}

        <Routes>
          <Route path="/" element={<Shop />} />

          <Route path="/verify/:uniqueString" element={<EmailVerification />} />

          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/user/login" element={<UserLoginSignup />} />
          <Route path="/user/signup" element={<UserLoginSignup />} />

          <Route path="/inspector/login" element={<InspectorLogin />} />

          {/* Protected routes for admin */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute expectedRole="admin" />}
          >
            <Route index element={<AllPost />} />
            <Route path="approve-post" element={<ApprovePost />} />
            <Route path="all-post" element={<AllPost />} />
            <Route path="add-inspector" element={<AddInspector />} />
            <Route path="career" element={<CareerApplication />} />
            <Route path="manage-inspector" element={<ManageInspector />} />
            <Route path="inspection-request" element={<InspectionRequests />} />
          </Route>

          {/* Protected routes for inspector */}
          <Route
            path="/inspector/*"
            element={<ProtectedRoute expectedRole="inspector" />}
          >
            <Route index element={<Inspector />} />
            <Route path="inspect-post" element={<InspectPost />} />
            <Route path="inspect-request" element={<InspectBuyerRequest />} />
          </Route>

          {/* New route for MyPosts, accessible by users, admins, or inspectors */}
          <Route
            element={
              <ProtectedRoute expectedRole={["user", "admin", "inspector"]} />
            }
          >
            <Route path="/my-posts" element={<MyPosts />} />

            <Route path="/post-detail" element={<PostDetail />}>
              <Route path=":postId" element={<PostDetail />} />
            </Route>

            <Route path="/chat/:userId" element={<Chat />} />
            <Route
              path="/chat/:recipientId/:senderId/:recipientName"
              element={<Chat />}
            />

            <Route path="/shop" element={<ShopCategory />} />

            <Route path="/career" element={<Career />} />
          </Route>

          {/* ----------------------------------------------------- */}

          <Route path="/new" element={<ShopCategory category="new" />} />
          <Route path="/old" element={<ShopCategory category="old" />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/ad" element={<Ad />} />
          <Route path="/post" element={<PostAd />} />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
        </Routes>

        {/* Conditional rendering of the footer */}
        {window.location.pathname === "/admin" && userRole === "admin" ? (
          <></>
        ) : (
          <Footer />
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
