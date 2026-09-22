interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3 font-medium tracking-wider transition-[background-color,color,border-color,transform] duration-300 text-sm";

  const variants = {
    primary: "bg-salon-gold text-salon-primary hover:bg-salon-gold-light",
    secondary:
      "bg-transparent border border-salon-gold text-salon-gold hover:bg-salon-gold hover:text-salon-primary",
    outline:
      "bg-transparent border border-salon-muted text-salon-muted hover:border-salon-white hover:text-salon-white",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
