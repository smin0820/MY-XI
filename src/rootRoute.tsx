import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/globalLayout";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import GuestOnlyLayout from "./components/layout/guestOnlyLayout";
import MemberOnlyLayout from "./components/layout/memberOnlyLayout";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";

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
          <Route path="/" />
          <Route path="about" />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Route>
    </Routes>
  );
}
