/**
 * class representing a tibe member within a campaign
 */


export class CampaignTribeMember {

	// reference to the _id of the tribe in the tribes collection
	member: any;

	// consent_pending | consent_request | consent_declined | consent_approved | delivery_error
	consentStatus: string;

  // delivery_pending | delivery_booked | delivery_collect | delivery_comnplete | delivery_error
	productDeliveryStatus: string;

  // outcome of the engagement: no_outcome | negative_outcome | natural_outcome | positive_outcome
  outcomeStatus: string;

  // processId if a workflow is assigned to this engagement
	processId: number;

  // activity history for this tribe member relating to this campaign
	activity: [{
		activityDate: Date;
	    // created | consent_request | consent_approved | consent_declined | delivery_booked | delivery_collect | delivery_complete | delivery_error
	    type: string;
	    description: string;
		}];

}