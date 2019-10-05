export default {
  products: {
    all: () => "/api/products",
    byPartNumber: partNumber => `/api/products/${partNumber}`
  },
  visited: {
    all: () => "/api/visited"
  }
};
