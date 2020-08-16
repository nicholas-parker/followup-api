/**
 * campaign
 */

import { CampaignTribeMember } from './campaignTribeMember';
import { CampaignEvent } from './campaignevent';
import { Engagement } from './engagement';
import { CampaignProduct } from './campaignproduct';

export class Campaign {

    _id: string;
	createdById: string;
	serviceOrgId: string;
    serviceOrgName: string;
    targetOrgId: string;
    targetOrgName: string;
    name: string;
    description: string;
    openDate: Date;
    closeDate: Date;
    promotionTitle: string;
    promotionDescription: string;
    products: CampaignProduct[];
    deliveryDates: Date[];
    engagement: Engagement[];
    tribe: CampaignTribeMember[];
    tags: string[];
    systemTags: string[];
    events: CampaignEvent[];

}
