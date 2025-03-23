import {
  useState,
  ReactNode,
  useMemo,
  createContext,
  SetStateAction,
} from "react";
import { useFetch } from "../hooks/useFetch";
import { ProductTypes } from "../types/ProductTypes";

interface ChildrenInterface {
  children: ReactNode;
}

interface ContextInterface {
  buscador: string;
  setBuscador: React.Dispatch<SetStateAction<string>>;
  filteredData: ProductTypes[];
  loading: boolean;
  setMinPrice: React.Dispatch<SetStateAction<number>>;
  setMaxPrice: React.Dispatch<SetStateAction<number>>;
  maxPrice: number;
  minPrice: number;
  setCategory: React.Dispatch<SetStateAction<string>>;
}

export const MyContextData = createContext<ContextInterface | undefined>(
  undefined
);

export const AppContext = ({ children }: ChildrenInterface) => {
  const [buscador, setBuscador] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [category, setCategory] = useState<string>("");
  const { produts, loading } = useFetch();

  // Filtrado de productos por nombre, precio y categoría
  const filteredData = useMemo(() => {
    return produts.filter((prod) => {
      const matchesName = prod.title
        .toLowerCase()
        .includes(buscador.toLowerCase());
      const matchesPrice = prod.price >= minPrice && prod.price <= maxPrice;
      const matchesCategory = category
        ? prod.category === category.toLowerCase()
        : true; // Si la categoría está vacía, no filtra por categoría
      return matchesName && matchesPrice && matchesCategory;
    });
  }, [buscador, minPrice, maxPrice, category, produts]);

  const value = {
    filteredData,
    buscador,
    setBuscador,
    loading,
    setMinPrice,
    setMaxPrice,
    setCategory,
    maxPrice,
    minPrice,
  };

  return (
    <MyContextData.Provider value={value}>{children}</MyContextData.Provider>
  );
};

export default AppContext;
