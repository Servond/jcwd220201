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
      backgroundColor: "rgb(49, 151, 149)",
      color: "white",
      _active: { backgroundColor: "rgb(40, 94, 97)" },
      _hover: { backgroundColor: "rgb(44, 122, 123)" },
      // hover: rgb(44, 122, 123)
      // active: rgb(40, 94, 97)
      // input border color active: rgb(, 191, 184)
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

export default Button;
