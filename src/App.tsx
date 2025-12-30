import "./App.css";
import RootRoute from "./rootRoute";
import SessionProvider from "./provider/sessionProvider";
import ModalProvider from "./provider/modalProvider";

function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}

export default App;
