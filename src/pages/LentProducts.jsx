import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LENT_PRODUCTS } from "../graphQl/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import RentProductCard from "../components/RentProductCard";

function LentProducts() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LENT_PRODUCTS);
  if (loading) return <LoadingSpinner fullPage />;
  if (error) {
    toast.error("Error fetching products..");
    return navigate("/");
  }
  return (
    <div className="my-products">
      <div className="products-title">Lent Products</div>

      <div className="products-container">
        {data.lentProducts?.length ? (
          data.lentProducts.map((borrowedProduct) => (
            <Link
              key={borrowedProduct.id}
              to={`/product/${borrowedProduct.product.id}`}
              className="product-link"
            >
              <RentProductCard data={borrowedProduct} />
            </Link>
          ))
        ) : (
          <div className="no-products">No Products Available</div>
        )}
      </div>
    </div>
  );
}

export default LentProducts;
