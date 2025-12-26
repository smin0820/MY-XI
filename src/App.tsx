import "./App.css";
import RootRoute from "./rootRoute";
import SessionProvider from "./provider/sessionProvider";

function App() {
  return (
    <SessionProvider>
      <RootRoute />
    </SessionProvider>
  );
}

export default App;
