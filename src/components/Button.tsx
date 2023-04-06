import React from "react";

interface Props {
  children: string;
  colour?: "primary" | "secondary" | "success" | "danger";
  onClick: () => void;
}

const Button = ({ children, onClick, colour = "primary" }: Props) => {
  return (
    <button onClick={onClick} type="button" className={"btn btn-" + colour}>
      {children}
    </button>
  );
};

export default Button;
