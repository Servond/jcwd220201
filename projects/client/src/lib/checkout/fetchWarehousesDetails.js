import fetchCities from "./fetchCities";
import fetchWarehouses from "./fetchWarehouses";

const fetchWarehousesDetails = async () => {
  // Get cities data
  const {
    data: { data: cities },
  } = await fetchCities();

  // Get warehouses data
  const {
    data: { data: warehouses },
  } = await fetchWarehouses();

  // Get location details of every warehouse
  const warehouseDetails = warehouses.map((warehouse) => {
    const splitterIndex = warehouse.city.indexOf(" ");
    const type = warehouse.city.substring(0, splitterIndex);
    const cityName = warehouse.city.slice(splitterIndex + 1);

    return { type, cityName, coordinates: warehouse.pinpoint };
  });

  const warehousesInfo = [];

  warehouseDetails.forEach((warehouse) => {
    const warehouseData = cities.find((city) => {
      return (
        city.type.toLowerCase() === warehouse.type.toLowerCase() &&
        city.city_name.toLowerCase() === warehouse.cityName.toLowerCase()
      );
    });

    warehouseData.coordinates = warehouse.coordinates;
    warehousesInfo.push(warehouseData);
  });

  // Return location details of every warehouse
  return warehouseDetails;
};

export default fetchWarehousesDetails;
