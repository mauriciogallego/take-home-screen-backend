export const isRfq =
  'Answer the next question with YES or NO. is the following text a RFQ?\n';

export const getProductList = (productNames: string, email: string) =>
  `Give me a JSON of the products from the following text, specifying name, unit, dimensions, quantity, and expiration date. If there is no information, then set it to null. If there are products named similarly to ${productNames} and change them:\n ${email}`;
