import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    borderRadius: "0.5rem",
    fontWeight: "bold",
    px: "2rem",
    textAlign: "center",
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: "0.75rem",
      height: "2rem",
    },
    md: {
      fontSize: "0.75rem",
      height: "2.5rem",
    },
    lg: {
      fontSize: "1rem",
      height: "3rem",
    },
  },
  // Styles for the visual style variations
  variants: {
    outline: {
      borderColor: "",
      color: "",
    },
    solid: {
      backgroundColor: "teal",
      color: "white",
      _hover: { backgroundColor: "red" },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

export default Button;
