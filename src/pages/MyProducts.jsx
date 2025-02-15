import "../styles/Home.css";
import { Link } from "react-router-dom"; // Fix import (was `react-router`)
import { useQuery } from "@apollo/client";
import { GET_MY_PRODUCTS } from "../graphQl/queries";
import MyProductsCard from "../components/ProductCard";
import Button from "../components/Button";
function MyProduct() {
  const { loading, error, data } = useQuery(GET_MY_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="my-products">
      <div className="products-title">My Products</div>
      <div className="products-container">
        {data.myProducts.length ? (
          data.myProducts.map((product) => (
            <Link
              to={`/edit/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <MyProductsCard data={product} />
            </Link>
          ))
        ) : (
          <div className="no-products">No Products Available</div>
        )}
      </div>

      <div className="addbutton-section">
        <Link to="/add-products">
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

export default MyProduct;
