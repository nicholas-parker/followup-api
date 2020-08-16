export class TribeCommsDetails {

    /**
     * full name of influencer, i.e. firstName + secondName
     */
    influencerFullName: string;

    /**
     * first name of the influencer
     */
    influencerFirstName: string;

    /**
     * email | sms | twitter | facebook | instagram | ticktock
     */
    invitationChannel: string;

    /**
     * the Tribe members specific channel Id
     */
    channelId: string;

    /**
     * recipient details for the channel
     */
    recipient: string;

}
