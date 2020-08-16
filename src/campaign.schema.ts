import * as mongoose from 'mongoose';

export const TribeMember = new mongoose.Schema({

  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Tribe' },

	// consent_pending | consent_request | consent_declined | consent_approved | delivery_error
	consentStatus: String,

	// delivery_pending | delivery_booked | delivery_collect | delivery_comnplete | delivery_error | no_delivery_address
	productDeliveryStatus: String,

  // outcome of the engagement: no_outcome | negative_outcome | natural_outcome | positive_outcome
  outcomeStatus: String,

	// processId if a workflow is assigned to this engagement
	processId: Number,

  // uuid of the engagement, used when retrieving the engagement for the tribe member
  engageUUID: String,

  });

export const CampaignComms = new mongoose.Schema({

  // use case: invitation_to_sample | notification_to_sample
  useCase: String,

  // email | sms | facebook | snapchat | twitter
  channelType: String,

  // sender, structure depends on channelType, i.e. email address for email
  sender: String,

  // template as a string, the template is processed into the message when the engagement is sent
  template: String,

  // subject
  subject: String,

});

export const CampaignEvent = new mongoose.Schema({

  // date this event happened
  dateTime: Date,

  // type of event
  eventType: String,

  // description
  description: String,

});

/**
 * Defines a campaigns business capabilities from a system perspective
 */
export const CampaignFeature = new mongoose.Schema({

  // is paid for
  isPaid: Boolean,

  // max number of campaign members
  maxMembers: Number,

  // features which are active
  
});

/**
 * A product associated with the campaint
 */
export const CampaingProduct = new mongoose.Schema({

  // date added
  dateAdded: Date,

  // active
  active: Boolean,

  // date removed
  dateRemoved: Date,

  // notes for product relevent to this campaign
  notes: String,

  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

});

export const CampaignSchema = new mongoose.Schema({

	  // relationships
	  createdDate: Date,
    createdById: String,
	  serviceOrgId: String,
    serviceOrgName: String,
    targetOrgId: String,
    targetOrgName: String,

    // the business capabilities definition for this specific campaign
    feature: CampaignFeature,

    // name of campaign
    name: String,

    // description of campaign
    description: String,

    // first date this campaign can be processed
    openDate: Date,

    // last date this campaign can be processed
    closeDate: Date,

    // title of the promotion displayed to the tribe member when they accept/dewcline the engagement
    promotionTitle: String,

    // description of sampling displayed to the tribe member when they accept/decline the engagement
    promotionDescription: String,

    // an array of products which are sampled in this campaign
    products: [CampaingProduct],

    // an array of delivery date options
    deliveryDates: [Date],

    // templates used to engage the tribe in the campaign
    engagement: [CampaignComms],

    // members of the tribe selected for the campaign
    tribe: [TribeMember],

    // tags attached by the user
    tags: [String],

    // system level tags
    systemTags: [String],

    // events
    events: [CampaignEvent],
    });