import { useCallback } from "react";
import { useSearchContext } from "../hooks/ContextHooks";

const FilterButtons = () => {
  const {
    setMinPrice,
    setMaxPrice,
    maxPrice,
    minPrice,
    setCategory,
  } = useSearchContext();

  // Usar useCallback para evitar que estas funciones se recreen en cada render
  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (e.target.name === "minPrice") {
        setMinPrice(value);
      } else {
        setMaxPrice(value);
      }
    },
    [setMinPrice, setMaxPrice]
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    },
    [setCategory]
  );

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      {/* Filtro de precio */}
      <div className="flex flex-col">
        <label htmlFor="price" className="text-lg font-semibold">
          Precio máximo: ${maxPrice}
        </label>
        <input
          id="price"
          type="range"
          name="maxPrice"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="minPrice" className="text-lg font-semibold">
          Precio mínimo: ${minPrice}
        </label>
        <input
          id="minPrice"
          type="range"
          name="minPrice"
          min="0"
          max="1000"
          value={minPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Filtro de categoría */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-lg font-semibold">
          Categoría
        </label>
        <select
          id="category"
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las categorías</option>
          <option value="Clothes">Ropa</option>
          <option value="electronics">Electrónica</option>
          <option value="furniture">Muebles</option>
          <option value="Shoes">Zapatos</option>
          <option value="Miscellaneous">Misceláneos</option>
        </select>
      </div>
    </div>
  );
};

export default FilterButtons;
