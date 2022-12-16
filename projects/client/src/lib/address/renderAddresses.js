import AddressCard from "../../components/address/AddressCard";

const renderAddresses = (
  addresses,
  pageIndex,
  setDefaultAddress,
  setAddresses,
  setTotalPage,
  setPageIndex
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
            setPageIndex,
          }}
          data={address}
          pageIndex={pageIndex}
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
          setPageIndex,
        }}
        data={address}
        pageIndex={pageIndex}
        variant="default"
      />
    );
  });

  return addressList;
};

export default renderAddresses;
