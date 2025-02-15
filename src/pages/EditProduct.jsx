import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT } from "../graphQl/queries";
// import { UPDATE_PRODUCT } from "../graphQl/mutations";
import "../styles/EditProduct.css";
import { UPDATE_PRODUCT } from "../graphQl/mutations";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const PRODUCT_CATEGORIES = [
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "HOME_APPLIANCES", label: "Home Appliances" },
  { value: "SPORTING_GOODS", label: "Sporting Goods" },
  { value: "OUTDOOR", label: "Outdoor" },
  { value: "TOYS", label: "Toys" },
];

const RENT_OPTIONS = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch existing product data
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { productId },
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.product) {
      const {
        title,
        categories,
        description,
        buyPrice,
        rentPrice,
        rentOption,
      } = data.product;
      setValue("title", title);
      setValue(
        "categories",
        categories.map((cat) => PRODUCT_CATEGORIES.find((c) => c.value === cat))
      );
      setValue("description", description);
      setValue("buyPrice", buyPrice);
      setValue("rentPrice", rentPrice);
      setValue(
        "rentOption",
        RENT_OPTIONS.find((opt) => opt.value === rentOption)
      );
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const updatedData = {
        id: productId,
        title: formData.title,
        categories: formData.categories.map((cat) => cat.value),
        description: formData.description,
        buyPrice: parseFloat(formData.buyPrice),
        rentPrice: parseFloat(formData.rentPrice),
        rentOption: formData.rentOption.value,
      };

      await updateProduct({ variables: updatedData });

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Product update failed:", err);
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <label htmlFor="title">Product Title</label>
        <input
          id="title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          placeholder="Enter product title"
        />
        {errors.title && <span className="error">{errors.title.message}</span>}

        {/* Categories */}
        <label htmlFor="categories">Categories</label>
        <Controller
          name="categories"
          control={control}
          rules={{ required: "Please select at least one category" }}
          render={({ field }) => (
            <Select
              {...field}
              options={PRODUCT_CATEGORIES}
              isMulti
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select categories"
            />
          )}
        />
        {errors.categories && (
          <span className="error">{errors.categories.message}</span>
        )}

        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          placeholder="Enter product description"
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}

        {/* Buy Price */}
        <label htmlFor="buy_price">Buy Price</label>
        <input
          type="number"
          id="buy_price"
          {...register("buyPrice", {
            required: "Buy price is required",
            min: { value: 0, message: "Price must be greater than 0" },
          })}
          placeholder="Enter buy price"
        />
        {errors.buyPrice && (
          <span className="error">{errors.buyPrice.message}</span>
        )}

        {/* Rent Price */}
        <label htmlFor="rent_price">Rent Price</label>
        <input
          type="number"
          id="rent_price"
          {...register("rentPrice", {
            required: "Rent price is required",
            min: { value: 0, message: "Price must be greater than 0" },
          })}
          placeholder="Enter rent price"
        />
        {errors.rentPrice && (
          <span className="error">{errors.rentPrice.message}</span>
        )}

        {/* Rent Option */}
        <label htmlFor="rentOption">Rent Option</label>
        <Controller
          name="rentOption"
          control={control}
          rules={{ required: "Please select a rent option" }}
          render={({ field }) => (
            <Select
              {...field}
              options={RENT_OPTIONS}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select rent option"
            />
          )}
        />
        {errors.rentOption && (
          <span className="error">{errors.rentOption.message}</span>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn" disabled={updating}>
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
