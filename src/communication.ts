/**
 * 
 * a class which captures an individual communication between LMP and Tribe Member.
 * Is a child class of CampaignEngagement
 * 
 */
export class Communication {

    direction: string;                            // in | out
    msgDate: Date;                                // date the communication took place
    businessAction: string;                       // followup | followup_respone | query
    type: string;                                 // email | twitter | instagram
    externalMesssageId: string;                   // reference for the message in the external message system, e.g. GMail
    deliveryTracking: string;                     // followup_queued | followup_sent | followup_undeliverable | followup_open
    coverage: string;                             // flag set to true if the communication implies coverage
    sentiment: string;                            // negative | neutral | positive

}