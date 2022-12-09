const {} = require("");

const addressController = {
  addNewAddress: async (req, res) => {
    try {
      // PSEUDOCODE
      // Get user id
      // Get form data
      // Get pinpoint location of said address
      // Persist user address in the Addresses table
    } catch (err) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = addressController;
