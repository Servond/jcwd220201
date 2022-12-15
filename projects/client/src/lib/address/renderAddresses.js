import AddressCard from "../../components/address/AddressCard";

const renderAddresses = (
  addresses,
  setDefaultAddress,
  setAddresses,
  setTotalPage
) => {
  const addressList = addresses.map((address) => {
    if (address.is_default) {
      return (
        <AddressCard
          key={address.id}
          setters={{
            setDefaultAddress,
            setAddresses,
            setTotalPage,
          }}
          data={address}
          variant="selected"
        />
      );
    }
    return (
      <AddressCard
        key={address.id}
        setters={{
          setDefaultAddress,
          setAddresses,
          setTotalPage,
        }}
        data={address}
        variant="default"
      />
    );
  });

  return addressList;
};

export default renderAddresses;
