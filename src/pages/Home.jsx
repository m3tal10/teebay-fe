import "../styles/Home.css";
import { Link } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../graphQl/queries";
import MyProductsCard from "../components/ProductCard";
import Button from "../components/Button";

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <p>loading...</p>;
  console.warn(data.products);

  return (
    <div>
      <div className="my-products">
        <div className="products-title">All Products</div>

        <div className="">
          {data.products.length ? (
            data.products.map((product) => (
              <div key={product.id}>
                <MyProductsCard data={product}></MyProductsCard>
              </div>
            ))
          ) : (
            <div>"No Products available." </div>
          )}
        </div>

        {/* {selectedProduct && (
          <EditProduct
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSave={handleSave}
          />
        )} */}
      </div>
      <div className="addbutton-section">
        <Link to="/add-product">
          {" "}
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
