import { useSearchContext } from "../hooks/ContextHooks";

const FormSearch = () => {
  const { buscador, setBuscador } = useSearchContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscador(e.target.value);
  };

  return (
    <form className="flex flex-col items-center gap-2 w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={buscador}
        onChange={handleSearch}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {buscador && (
        <p className="text-gray-600 text-sm">Buscando: {buscador}</p>
      )}
    </form>
  );
};

export default FormSearch;
