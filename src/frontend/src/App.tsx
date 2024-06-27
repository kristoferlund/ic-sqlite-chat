import Chat from "./components/Chat";
import Loader from "./components/Loader";
import useDatabaseContext from "./database/hooks/useDatabaseContext";

function App() {
  const { isInitializing } = useDatabaseContext();

  return (
    <main>
      <img src="/ic.svg" />
      {isInitializing ? <Loader /> : <Chat />}
    </main>
  );
}

export default App;
