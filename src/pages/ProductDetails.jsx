import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphQl/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BUY_PRODUCT, RENT_PRODUCT } from "../graphQl/mutations";
import { toast } from "react-toastify";
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

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const startTime = watch("startTime");
  const [rentProduct, { data: rentData, loading: rentLoading }] =
    useMutation(RENT_PRODUCT);
  const [buyProduct, { data: buyData, loading: buyLoading }] =
    useMutation(BUY_PRODUCT);

  const handleBuyModalOpen = () => setIsBuyModalOpen(true);
  const handleRentModalOpen = () => setIsRentModalOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBuyModalOpen(false);
    setIsRentModalOpen(false);
    reset();
  };

  const submitHandler = async ({ startTime, endTime }) => {
    try {
      await rentProduct({
        variables: {
          id: productId,
          startTime,
          endTime,
        },
      });
      toast.success("Product rent successfully.");
    } catch (err) {
      toast.error(err.message);
    }
    setIsBuyModalOpen(false);
    setIsRentModalOpen(false);
    reset();
    return;
  };

  const handleBuyProduct = async () => {
    try {
      await buyProduct({
        variables: {
          id: productId,
        },
      });
      toast.success("Product purchased successfully.");
    } catch (err) {
      toast.error(err.message);
    }
    setIsBuyModalOpen(false);
    setIsRentModalOpen(false);
  };

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
        <Button type="primary" text="Rent" onClick={handleRentModalOpen} />
        <Button type="primary" text="Buy" onClick={handleBuyModalOpen} />
      </div>
      {/* Buy modal */}
      <Modal
        open={isBuyModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Are you sure you want to buy this product?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button type="danger" text="No" onClick={handleClose} />
            <Button type="primary" text="Yes" onClick={handleBuyProduct} />
          </Box>
        </Box>
      </Modal>
      {/* Rent modal */}
      <Modal
        open={isRentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Rental Period
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* start time datepicker */}
            <label>From</label>
            <Controller
              name="startTime"
              control={control}
              defaultValue={null}
              rules={{
                required: "Start time is required",
                validate: (value) => {
                  const now = new Date();
                  if (!value) return "Start time is required";
                  if (value < now) return "Start time must be in the future";
                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  ref={(ref) => field.ref({ focus: () => ref?.setFocus?.() })}
                />
              )}
            />
            {errors.startTime && (
              <p style={{ color: "red" }}>{errors.startTime.message}</p>
            )}
            {/* end time datepicker */}
            <label>To</label>
            <Controller
              name="endTime"
              control={control}
              defaultValue={null}
              rules={{
                required: "End time is required",
                validate: (value) => {
                  const now = new Date();
                  if (!value) return "End time is required";
                  if (value < now) return "End time must be in the future";
                  if (startTime && value <= startTime)
                    return "End time must be after start time";
                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  ref={(ref) => field.ref({ focus: () => ref?.setFocus?.() })}
                />
              )}
            />
            {errors.endTime && (
              <p style={{ color: "red" }}>{errors.endTime.message}</p>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button type="danger" text="Go back" onClick={handleClose} />
              <button className="btn buy-btn">Confirm rent</button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductDetails;
