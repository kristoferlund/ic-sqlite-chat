import Chat from "./components/Chat";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import useDatabaseContext from "./database/hooks/useDatabaseContext";

function App() {
  const { isInitializing } = useDatabaseContext();

  return (
    <main>
      <img src="/ic.svg" />
      {isInitializing ? <Loader /> : <Chat />}
      <Footer />
    </main>
  );
}

export default App;
