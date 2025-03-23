import { ProductTypes } from "../types/ProductTypes";

interface Props {
  prod: ProductTypes;
}

const ProductCard = ({ prod }: Props) => {
  return (
    <div>
      <div className="flex flex-wrap justify-center w-56 " key={prod.id}>
        <img className="w-44 h-44" src={prod.image} alt={prod.title} />
        <h1>{prod.title}</h1>
        <h1>{prod.price}$</h1>
      </div>
    </div>
  );
};

export default ProductCard;
