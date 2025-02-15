import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SOLD_PRODUCTS } from "../graphQl/queries";
import MyProductsCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function SoldProducts() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_SOLD_PRODUCTS);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) {
    toast.error("Error fetching product");
    return navigate("/");
  }

  return (
    <div className="my-products">
      <div className="products-title">Sold Products</div>

      <div className="products-container">
        {data.soldProducts?.length ? (
          data.soldProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-link"
            >
              <MyProductsCard data={product} home />
            </Link>
          ))
        ) : (
          <div className="no-products">No Products Available</div>
        )}
      </div>
    </div>
  );
}

export default SoldProducts;
