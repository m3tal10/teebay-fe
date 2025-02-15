import "../styles/components/Button.css";

const Button = ({ text, onClick, type = "primary", loading = false }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick} disabled={loading}>
      {text}
    </button>
  );
};

export default Button;
