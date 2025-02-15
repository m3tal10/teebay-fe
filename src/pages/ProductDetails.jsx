import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphQl/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

const ProductDetails = () => {
  const { productId } = useParams();

  // Fetch existing product data
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { productId },
  });
  const product = data?.product;
  if (loading) return <LoadingSpinner fullPage />;
  return (
    <div className="product-details">
      <h1 className="product-title">{product.title}</h1>

      <div className="product-meta">
        <p className="product-category">
          Categories: {product.categories.join(",")}
        </p>
        <p className="product-price">Price: {product.buyPrice}</p>
      </div>

      <div className="product-description">
        <p>{product.description}</p>
      </div>

      <div className="button-wrapper">
        <Button type="primary" text="Rent" />
        <Button type="primary" text="Buy" />
      </div>
    </div>
  );
};

export default ProductDetails;
