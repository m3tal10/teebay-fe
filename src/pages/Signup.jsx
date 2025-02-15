import { useForm } from "react-hook-form";

import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router";
import { SIGN_UP } from "../graphQl/mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  const onSubmit = async ({
    firstName,
    lastName,
    address,
    email,
    phone,
    password,
  }) => {
    try {
      const response = await signup({
        variables: { firstName, lastName, address, email, phone, password },
      });
      if (response.data?.signup?.token) {
        localStorage.setItem("token", response.data.signup.token);
      }
      toast.success("Signed up successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>SIGN UP</h2>
      <div className="signup-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              className="signup-input-field"
              {...register("firstName", { required: "First Name is required" })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="signup-input-field"
              {...register("lastName", { required: "Last Name is required" })}
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            className="signup-input-field"
            {...register("address")}
          />

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="signup-input-field"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="signup-input-field"
              {...register("phone", {
                pattern: { value: /^[0-9]+$/, message: "Invalid phone number" },
              })}
            />
          </div>

          <input
            type="password"
            placeholder="Password"
            className="signup-input-field"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="signup-input-field"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />

          <div className="error-messages">
            {Object.values(errors).map((error, index) => (
              <p key={index} className="error">
                {error.message}
              </p>
            ))}
          </div>

          <button type="submit" className="button-register" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
