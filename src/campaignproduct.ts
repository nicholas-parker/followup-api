import { Product } from './product';

export class CampaignProduct {

  _id;
  
      // date added
  dateAdded: Date;

  // active
  active: Boolean;

  // date removed
  dateRemoved: Date;

  // notes for product relevent to this campaign
  notes: string;

  product: Product;

}
