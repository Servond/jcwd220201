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
      fontSize: "0.875rem",
      height: "2.5rem",
    },
    lg: {
      fontSize: "1rem",
      height: "3rem",
    },
  },
  // Styles for the visual style variations
  variants: {
    // base: {
    //   backgroundColor: "rgb(229, 231, 233)",
    //   color: "rgb(108, 114, 124)",
    //   fontSize: "0.875rem",
    //   fontWeight: "600",
    //   px: "1rem",
    // },
    outline: {
      borderColor: "rgb(0, 128, 128)",
      color: "rgb(0, 128, 128)",
    },
    solid: {
      backgroundColor: "rgb(49, 151, 149)",
      color: "white",
      _active: { backgroundColor: "rgb(40, 94, 97)" },
      _hover: { backgroundColor: "rgb(44, 122, 123)" },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

export default Button;
