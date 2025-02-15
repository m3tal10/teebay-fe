import "../styles/Home.css";
import { Link } from "react-router-dom"; // Fix import (was `react-router`)
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../graphQl/queries";
import MyProductsCard from "../components/ProductCard";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="my-products">
      <div className="products-title">All Products</div>

      <div className="products-container">
        {data.products.length ? (
          data.products.map((product) => (
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

      <div className="addbutton-section">
        <Link to="/add-product">
          <Button
            text="Add Product"
            onClick={() => console.log("Add clicked")}
            type="primary"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
