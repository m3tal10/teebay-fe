import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphQl/mutations";
import { toast } from "react-toastify";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { loading }] = useMutation(SIGN_IN);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({
        variables: { email: email, password: password },
      });
      if (response.data?.login?.token) {
        localStorage.setItem("token", response.data.login.token);
      }
      navigate("/", { replace: true, state: { from: location } });
      toast.success("Logged in successfully.");
    } catch (err) {
      toast.error("Email or password incorrect.");
    }
  };

  return (
    <div className="signin-container">
      <h2>SIGN IN</h2>
      <form className="signin-box" onSubmit={handleSubmit(handleLogin)}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="login-input-field"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="login-input-field"
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
        <p className="singupLink p">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
