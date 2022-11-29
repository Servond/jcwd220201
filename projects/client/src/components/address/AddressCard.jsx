import { useStyleConfig, Box } from "@chakra-ui/react";

const AddressCard = (props) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("AddressCard", { variant });

  return (
    <Box __css={styles} {...rest}>
      Test
    </Box>
  );
};

export default AddressCard;
