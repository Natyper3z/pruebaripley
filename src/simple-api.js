module.exports = () => {
  const apiRoute = 'https://simple.ripley.cl/api/v2';

  return {
    byId: id => `${apiRoute}/products/by-id/${id}`,
    byPartNumber: partNumber => `${apiRoute}/products/${partNumber}`,
    byPartNumbers: partNumbers => `${apiRoute}/products?partNumbers=${partNumbers}`,
  };
};
