import "../styles/components/LoadingSpinner.css";

const LoadingSpinner = ({ fullPage }) => {
  if (fullPage) {
    return (
      <div className="loading-overlay">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
