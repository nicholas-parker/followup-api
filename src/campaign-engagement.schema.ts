import * as mongoose from 'mongoose';

export const CommunicationSchema = new mongoose.Schema({

    direction: String,                            // in | out
    msgDate: { type : Date, default: Date.now },  // date the communication took place
    businessAction: String,                       // followup | followup_respone | query
    type: String,                                 // email | twitter | instagram
    externalMesssageId: String,                   // reference for the message in the external message system, e.g. GMail
    deliveryTracking: String,                     // followup_queued | followup_sent | followup_undeliverable | followup_open
    coverage: String,                             // flag set to true if the communication implies coverage
    sentiment: String                             // negative | neutral | positive
});

export const CampaignEngagementSchema = new mongoose.Schema({

    campaignId: String,                           // id for the campaign driving the engagement
    tribeId: String,                              // id for the tribe member engagement with
    businessAction: String,                       // business action for the engagement if initial direction is outbound
    initialDirection: String,                     // in | out
    communication: [CommunicationSchema]

});
