const haversine = require("haversine");

const compareWarehouseDistances = (
  shippingAddressCoordinates,
  warehousesInfo
) => {
  const nearestWarehouse = warehousesInfo.reduce(
    (accumulator, currentValue) => {
      // Format warehouses coordinates
      const accumulatorCoordinates = JSON.parse(accumulator.coordinates);
      const prevWarehouseCoordinates = {
        latitude: accumulatorCoordinates.lat,
        longitude: accumulatorCoordinates.lng,
      };

      const currentValueCoordinates = JSON.parse(currentValue.coordinates);
      const currWarehouseCoordinates = {
        latitude: currentValueCoordinates.lat,
        longitude: currentValueCoordinates.lng,
      };

      // Compare distances between shipping address and warehouses location
      const distanceToPrevWarehouse = haversine(
        shippingAddressCoordinates,
        prevWarehouseCoordinates
      );

      const distanceToCurrWarehouse = haversine(
        shippingAddressCoordinates,
        currWarehouseCoordinates
      );

      if (distanceToCurrWarehouse > distanceToPrevWarehouse) {
        return accumulator;
      }

      return currentValue;
    }
  );

  return nearestWarehouse;
};

module.exports = compareWarehouseDistances;
