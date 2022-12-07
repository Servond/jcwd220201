import { ListItem } from "@chakra-ui/react";

const renderFilteredCities = (
  filteredCities,
  setFieldValue,
  setDisplaySuggestion,
  setIsSelected
) => {
  const MAX_SUGGESTION_LENGTH = 10;
  const citySuggestions = filteredCities.slice(0, MAX_SUGGESTION_LENGTH + 1);

  return citySuggestions.map((city) => {
    return (
      <ListItem
        borderRadius="0.375rem 0.375rem 0 0"
        cursor="pointer"
        key={city.city_id}
        onClick={() => {
          setFieldValue("city", `${city.type} ${city.city_name}`);
          setIsSelected(true);
          setDisplaySuggestion(false);
        }}
        px="1rem"
        py="0.875rem"
        _hover={{ backgroundColor: "rgba(62, 191, 184, 0.14)" }}
      >
        {`${city.type} ${city.city_name}`}
      </ListItem>
    );
  });
};

export default renderFilteredCities;
