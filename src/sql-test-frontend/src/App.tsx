import Chat from "./components/Chat";
import useDatabaseContext from "./database/hooks/useDatabaseContext";

function App() {
  console.log("RENDERING APP");

  const { isInitializing } = useDatabaseContext();

  return (
    <main>
      <img src="/ic.svg" />
      {isInitializing ? <p>Initializing...</p> : <Chat />}
    </main>
  );
}

export default App;
