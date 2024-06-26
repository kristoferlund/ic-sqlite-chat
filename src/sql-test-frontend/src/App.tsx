import Chat from "./components/Chat";
import useDatabaseContext from "./database/hooks/useDatabaseContext";

function App() {
  const { isInitializing } = useDatabaseContext();

  return (
    <main>
      <img src="/ic.svg" />
      {isInitializing ? <p>Initializing...</p> : <Chat />}
    </main>
  );
}

export default App;
