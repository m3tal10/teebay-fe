import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOUGHT_PRODUCTS } from "../graphQl/queries";
import MyProductsCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function BoughtProducts() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOUGHT_PRODUCTS);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) {
    toast.error("Error fetching products..");
    return navigate("/");
  }

  return (
    <div className="my-products">
      <div className="products-title">Bought Products</div>

      <div className="products-container">
        {data.boughtProducts?.length ? (
          data.boughtProducts.map((product) => (
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

export default BoughtProducts;
