import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BORROWED_PRODUCTS } from "../graphQl/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import RentProductCard from "../components/RentProductCard";

function BorrowedProducts() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BORROWED_PRODUCTS);
  if (loading) return <LoadingSpinner fullPage />;
  if (error) {
    toast.error("Error fetching products..");
    return navigate("/");
  }

  return (
    <div className="my-products">
      <div className="products-title">Bought Products</div>

      <div className="products-container">
        {data.borrowedProducts?.length ? (
          data.borrowedProducts.map((borrowedProduct) => (
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

export default BorrowedProducts;
