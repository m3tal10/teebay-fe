import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/addProduct.css";
import { CREATE_PRODUCT } from "../graphQl/mutations";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function CreateProduct() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      categories: [],
      description: "",
      buyPrice: "",
      rentPrice: "",
      rentOption: "",
    },
  });
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      cache.modify({
        fields: {
          myProducts(existingProducts = []) {
            // Add new product to cache
            return [createProduct, ...existingProducts];
          },
        },
      });
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

  const formValues = watch();

  const onSubmit = async (data) => {
    console.log(data.rentOption.value);
    // Transform categories array to match backend expectation
    const transformedData = {
      ...data,
      categories: data.categories.map((cat) => cat.value),
      rentOption: data.rentOption.value,
      buyPrice: parseFloat(data.buyPrice),
      rentPrice: parseFloat(data.rentPrice),
    };
    try {
      const response = await createProduct({
        variables: { ...transformedData },
      });
      navigate("/", { replace: true, state: { from: location } });
      toast.success("Product added successfully.");
    } catch (err) {
      toast.error("Failed to add product.");
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <label htmlFor="title">Select a title for your product</label>
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
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <label htmlFor="categories">Select categories</label>
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
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <label htmlFor="description">Select description</label>
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
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <label htmlFor="buy_price">Buy price</label>
            <input
              type="number"
              id="buy_price"
              {...register("buyPrice", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than 0",
                },
              })}
              placeholder="Enter price"
            />
            <label htmlFor="rent_price">Rent price</label>
            <input
              type="number"
              id="price"
              {...register("rentPrice", {
                required: "Rent price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than 0",
                },
              })}
              placeholder="Enter price"
            />
            <Controller
              name="rentOption"
              control={control}
              rules={{ required: "Please select at least one category" }}
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
            {errors.price && (
              <span className="error">{errors.price.message}</span>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-step summary">
            <h3>Summary</h3>
            <div className="summary-item">
              <span>Title:</span>
              <p>{formValues.title}</p>
            </div>
            <div className="summary-item">
              <span>Categories:</span>
              <p>{formValues.categories?.map((cat) => cat.label).join(", ")}</p>
            </div>
            <div className="summary-item">
              <span>Description:</span>
              <p>{formValues.description}</p>
            </div>
            <div className="summary-item">
              <span>Price:</span>
              <p>${formValues.buyPrice}</p>,{" "}
              <span>
                To rent:${Number(formValues.rentPrice)} per{" "}
                {formValues.rentOption?.value}
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-product">
      <div className="form-header">
        <h2>Create product</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderStep()}
        <div className="button-group">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="btn">
              Back
            </button>
          )}
          {step < 5 && (
            <button
              type="button"
              onClick={async () => {
                const fields = {
                  1: ["title"],
                  2: ["categories"],
                  3: ["description"],
                  4: ["price"],
                }[step];

                const result = await trigger(fields);
                if (result) {
                  nextStep();
                }
              }}
              className="btn"
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button type="submit" className="btn">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
