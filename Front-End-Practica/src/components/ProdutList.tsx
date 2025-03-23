import { useSearchContext } from "../hooks/ContextHooks";
import ProductCard from "./ProductCard";

const ProdutList = () => {
  const { filteredData, loading } = useSearchContext();

  if (loading) {
    <h1 className="">cargando Productos</h1>;
  }

  return (
    <main className="container mx-auto">
      <div className="flex flex-wrap gap-22 ">
        {filteredData.map((prod) => (
          <ProductCard prod={prod} />
        ))}
      </div>
    </main>
  );
};

export default ProdutList;
