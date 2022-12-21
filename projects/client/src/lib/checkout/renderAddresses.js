import AddressCard from "../../components/checkout/AddressCard";

const renderAdresses = (addresses) => {
  return addresses.map((address) => {
    if (!address.is_default) {
      return (
        <AddressCard address={address} key={address.id} variant="default" />
      );
    }
    return (
      <AddressCard address={address} key={address.id} variant="selected" />
    );
  });
};

export default renderAdresses;
