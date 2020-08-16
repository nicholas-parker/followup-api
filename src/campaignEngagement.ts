/**
 * A class which represents a single engagement stream with a tribe member
 * in the context of a sampling campaign.  Each message within the engagement
 * is a child class
 */

 import { Communication } from './communication'; 

 export class CampaignEngagement {

    campaignId: string;                           // id for the campaign driving the engagement
    tribeId: string;                              // id for the tribe member engagement with
    businessAction: string;                       // business action for the engagement if initial direction is outbound
    initialDirection: string;                     // in | out
    communication: Communication[];         // an array of individual communication between LMP and the Tribe Member

 }