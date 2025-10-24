import PropTypes from "prop-types";

/**
 * Reusable Button Component
 * Provides consistent styling across the entire application
 * Supports different variants, sizes, and states
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
}) => {
  // Base classes that apply to all buttons
  const baseClasses = "btn rounded-lg font-medium transition-all duration-200";

  // Variant classes
  const variantClasses = {
    primary: "btn-primary shadow-sm hover:shadow-md",
    accent: "btn-accent shadow-sm hover:shadow-md",
    outline: "btn-outline btn-primary hover:bg-primary hover:text-primary-content",
    ghost: "btn-ghost",
  };

  // Size classes
  const sizeClasses = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  // Width classes
  const widthClass = fullWidth ? "w-full" : "";

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "accent", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export default Button;
