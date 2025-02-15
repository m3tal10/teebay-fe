import "../styles/components/RentProductCard.css";
import { formatDate } from "../utils/dateFormatter";

const RentProductCard = ({ data }) => {
  const { product, startTime, endTime } = data;
  const now = new Date();
  const endDate = new Date(Number(endTime));
  const isExpired = now > endDate;
  return (
    <div className="borrowed-product-card">
      <div className="borrowed-product-header">
        <h3 className="borrowed-product-title">{product.title}</h3>
        <div className={`rental-status ${isExpired ? "expired" : "active"}`}>
          {isExpired ? "Expired" : "Active"}
        </div>
      </div>

      <div className="borrowed-product-details">
        <div className="product-meta">
          <span className="categories">
            Categories: {product.categories.join(", ")}
          </span>
          <span className="price">
            Rent: ${product.rentPrice}/{product.rentOption.toLowerCase()}
          </span>
        </div>

        <div className="rental-period">
          <div className="rental-time">
            <div className="time-label">Start Date</div>
            <div className="time-value">{formatDate(parseInt(startTime))}</div>
          </div>
          <div className="rental-time">
            <div className="time-label">End Date</div>
            <div className="time-value">{formatDate(parseInt(endTime))}</div>
          </div>
        </div>

        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};

export default RentProductCard;
