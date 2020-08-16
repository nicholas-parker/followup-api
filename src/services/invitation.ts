/**
 * a class represents all the data to populate an invitation to a campaign
 */

 export class Invitation {

    channelType;
    sender;
    recipient;
    businessAction;

    content: {
        subject;
        influencerFirstName;
        body;
        tracker;
        productImageURL;
        yesLinkURL;
        noLinkURL;

    };

    meta: {
        campaignId;
        campaignTribeId;
        tribeId;
        campaignEngagementId;
        communicationId;
    };

    constructor() {

        this.content = {
            subject: undefined,
            influencerFirstName: undefined,
            body: undefined,
            productImageURL: undefined,
            yesLinkURL: undefined,
            noLinkURL: undefined,
            tracker: undefined
        };

        this.meta = {
            campaignId: undefined,
            campaignTribeId: undefined,
            tribeId: undefined,
            campaignEngagementId: undefined,
            communicationId: undefined
        };
    }
 }
