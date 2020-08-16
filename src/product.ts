
export class Product {

  _id;
  
  // _id is created automatically by Mongo
  id: string;

  // _id FK of the organisation which owns this product
  brandOrgId: string;

  // _id FK of the organisation which is promoting the product, typically an agency
  agencyOrgId: string;

  // name of the product
  name: string;

  // description
  description: string;

  // vendors SKU for packing purposes
  SKU: string;

  // flag to indicate if this is still a current product
  current: boolean;

  // product page
  productURL: string;

  // standard number of items to be provided when dispatching this product
  qty: number;

}