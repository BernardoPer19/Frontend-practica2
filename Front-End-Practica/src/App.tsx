import "./App.css";
import FilterButtons from "./components/FilterButtons";
import FormSearch from "./components/FormSearch";
import ProdutList from "./components/ProdutList";
import "./index.css";
function App() {
  return (
    <>
      <main className="flex flex-col gap-10">
        <header>
          <FormSearch />
          <FilterButtons />
        </header>
        <ProdutList />
      </main>
    </>
  );
}

export default App;
