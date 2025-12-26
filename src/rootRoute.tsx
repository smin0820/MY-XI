import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/globalLayout";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import GuestOnlyLayout from "./components/layout/guestOnlyLayout";
import MemberOnlyLayout from "./components/layout/memberOnlyLayout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GuestOnlyLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<GlobalLayout />}>
        <Route element={<MemberOnlyLayout />}>
          <Route path="/" />
          <Route path="about" />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Route>
    </Routes>
  );
}
