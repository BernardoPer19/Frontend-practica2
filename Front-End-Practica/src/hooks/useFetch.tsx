import { useEffect, useState } from "react";
import { ProductTypes } from "../types/ProductTypes";

const API_GET = "https://fakestoreapi.com/products";

export const useFetch = () => {
  const [produts, setProduts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await fetch(API_GET);
      if (!data.ok) {
        throw new Error("Api no valida");
      }
      const res = await data.json();
      setProduts(res);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { produts, setProduts, loading };
};
