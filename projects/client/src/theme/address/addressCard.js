import { defineStyleConfig } from "@chakra-ui/react";

const AddressCard = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    alignItems: "center",
    width: "56.125rem",
    height: "12.25rem",
    m: "1rem 0.25rem 0.25rem 0.25rem",
    p: "1rem 1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 1px 6px 0px rgba(49, 53, 59, 0.12)",
    display: "flex",
    fontSize: "0.875rem",
    justifyContent: "space-between",
    lineHeight: "1rem",
    position: "relative",
  },
  // Styles for the visual style variations
  variants: {
    selected: {
      backgroundColor: "rgba(62, 191, 184, 0.08)",
      border: "1px solid rgb(62, 191, 184)",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "default",
  },
});

export default AddressCard;
