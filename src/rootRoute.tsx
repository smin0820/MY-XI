import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/globalLayout";
import SignIn from "./pages/signIn";
import SignUp from "./pages/SignUp";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<GlobalLayout />}>
        <Route path="/" />
        <Route path="about" />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
