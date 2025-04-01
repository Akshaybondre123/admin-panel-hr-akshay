import React from "react";
// import Loader from "../loader/Loader";
import { IonSpinner } from "@ionic/react";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Button type
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Custom CSS class
  loading?: boolean; // Loading state
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  disabled = false,
  loading,
className
}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    disabled={disabled}
  
    className={`flex justify-center items-center w-full text-white py-3 rounded-lg hover:bg-black/90 transition-colors mt-4 ${className}`}
  >
    {label}
    {loading && <IonSpinner className="ml-4" />} {/* Added margin if needed */}
  </button>
  );
};

export default Button;