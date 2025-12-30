import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/globalLayout";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import GuestOnlyLayout from "./components/layout/guestOnlyLayout";
import MemberOnlyLayout from "./components/layout/memberOnlyLayout";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";
import Index from "./pages";
import Test from "./pages/test";
import Admin from "./pages/admin";
import AdminOnlyLayout from "./components/layout/adminOnlyLayout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GuestOnlyLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Route>

      <Route element={<GlobalLayout />}>
        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="test" element={<Test />} />
          <Route path="about" />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to={"/"} />} />
          <Route element={<AdminOnlyLayout />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
