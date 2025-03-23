import { useContext } from "react";
import { MyContextData } from "../context/AppContext";

export const useSearchContext = () => {
    const context = useContext(MyContextData);
    if (!context) {
      throw new Error("useSearchContext debe usarse dentro de AppContext");
    }
    return context;
  };