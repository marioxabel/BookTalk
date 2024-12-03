import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css"; 


const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Something went wrong. We couldn’t process your request.</p>
      <button className="btn btn-custom mt-3" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
