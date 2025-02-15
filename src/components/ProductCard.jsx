import { Box, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/components/ProductCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyProductsCard({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = new Date(Number(data.createdAt));
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .split(",")
    .join("");

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h2 className="product-title">{data.title}</h2>
        <IconButton
          className="trash-icon"
          sx={{ fontSize: "2rem", padding: "1rem" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpen();
          }}
        >
          <DeleteIcon sx={{ color: "grey", fontSize: "2.5rem" }} />{" "}
        </IconButton>
      </div>

      <div className="product-categories">
        Categories: {data?.categories?.join(",")}
      </div>

      <div className="product-pricing">
        Price: {data.buyPrice} | Rent: {data.rentPrice} | {data.rentOption}
      </div>

      <p className="product-description">{data.description}</p>

      <div className="product-footer">
        <span className="date-posted">Date posted: {formattedDate}</span>
        <span className="view-count">{data.viewCount} views</span>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default MyProductsCard;
{
  /* <div className="product-card">
  <IconButton className="trash-icon" onClick={() => onDelete(data.id)}>
    <DeleteIcon sx={{ color: "red" }} />
  </IconButton>
  <div className="product-card-info">
    <div className="product-card-title">{data.title}</div>
    <div className="product-card-subdata">
      <div className="product-categories">
        Categories : {data?.categories?.join(",")}
      </div>
      <div>
        <BasicModal />
        <p>
          Price: {data.buyPrice} | Rent: {data.rentPrice} | {data.rentOption}
        </p>
      </div>
    </div>
    <div className="product-card-description">{data.description}</div>
    <div className="product-card-date">Date posted: {formattedDate}</div>
  </div>

  <div className="side-items">
    <div className="trash-svg">
      <svg
        className="lg:w-[80px] w-[60px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 14"
        fill="#ffffff"
      >
        <path
          d="M0.714286 12.4444C0.714286 13.3 1.35714 14 2.14286 14H7.85714C8.64286 14 9.28571 13.3 9.28571 12.4444V4.66667C9.28571 3.81111 8.64286 3.11111 7.85714 3.11111H2.14286C1.35714 3.11111 0.714286 3.81111 0.714286 4.66667V12.4444ZM9.28571 0.777778H7.5L6.99286 0.225556C6.86429 0.0855555 6.67857 0 6.49286 0H3.50714C3.32143 0 3.13571 0.0855555 3.00714 0.225556L2.5 0.777778H0.714286C0.321429 0.777778 0 1.12778 0 1.55556C0 1.98333 0.321429 2.33333 0.714286 2.33333H9.28571C9.67857 2.33333 10 1.98333 10 1.55556C10 1.12778 9.67857 0.777778 9.28571 0.777778Z"
          fill="#ffffff"
        />
      </svg>
    </div>
    <div>{data.viewCount} views</div>
  </div>
</div>; */
}
