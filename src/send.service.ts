import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SendMessage } from './sendMessage';
import { TribeCommsDetails } from './services/TribeCommsDetails';
import { InfluencerAPIService } from './services/influerncer-api.service';
import { Campaign } from './campaign';
import { Invitation } from './services/invitation';
import { OutboundChannelsAPIService } from './services/outbound-channels-api.service';
import { Engagement } from './engagement';
import { CampaignEngagement } from './campaignEngagement';
import { Communication } from './communication';

@Injectable()
export class SendService {
  
  static OUT = 'out';
  static IN = 'in';

  constructor(private influencerApiService: InfluencerAPIService,
              @InjectModel('Campaign') private readonly campaignModel: Model<Campaign>,
              @InjectModel('Communication') private readonly communicationModel: Model<Communication>,
              @InjectModel('CampaignEngagement') private readonly engagementModel: Model<CampaignEngagement>,
              private readonly channelsApiService: OutboundChannelsAPIService) {}
  /**
   * 
   * send a message based on a campaign engagement template to a campaign tribe member.
   * Using the context provided in the method parameters creates the Invitation message
   * which is processed by the outbound-commms-api to actually send the message
   * 
   */
  async send(msg: SendMessage): Promise<any> {

    /**
     * validation is done by the controller calling the method
     */

    /**
     * build the data required to send the message then send to the outbound-comms-api for delivery
     * by the apropriate channel
     */
    let comms: TribeCommsDetails;
    try {

      // tslint:disable-next-line: no-console
      console.log('INFO: Attempting to send followup for tribeId [' + msg.tribeId + '] for campaignTribeId [' + msg.campaignTribeId + ']');

     /**
      * get the prefered comms details for the tribe member we are communicating with
      */
      comms = await this.influencerApiService.getInfluencerCommsChannel(msg.tribeId);
      if (!comms) {

          // tslint:disable-next-line: no-console
          console.log('ERROR: Unable to find comms details for tribeId [' + msg.tribeId + '], not able to send this followup');
          throw new NotFoundException('ERROR: Unable to find comms details for tribeId [' + msg.tribeId + '], not able to send this invitation');

      }
    
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log('ERROR: Error thrown by Influencer API when looking up comms information for tribe member [' + msg.tribeId + ']');
      throw err;

    }  
 
   /**
    * 
    * get the content from the campaign needed to send the invitation.
    * getCampaignInvitatonContent returns campaign or throws NotFound or InternalServerError
    * 
    */
    let engagement: Engagement;
    let campaign: Campaign;
    campaign = await this.getCampaignInvitationContent(msg.campaignId, msg.orgId);

   
   /**
    * if an engagement is not found throws exception which is caught by calling controller
    */
    engagement = this.getCampaignEngagement(campaign, msg.businessAction, comms.invitationChannel);

   /**
    * record the sending of the followup
    */
    let campaignEngagement: Model<CampaignEngagement>;
    let communication: Model<Communication>;
    try {
 

     /**
      * create a new campaginEngagement if one not already in context
      */
      if (msg.campaignEngagementId === undefined) {

      const ce = { campaignId : msg.campaignId,
                   campaignTribeId: msg.campaignTribeId,
                   tribeId: msg.tribeId,
                   businessAction: msg.businessAction,
                   direction:  SendService.OUT,
                   communication: [] };
      campaignEngagement = this.engagementModel(ce);


      } else {

        campaignEngagement = this.engagementModel.findOne(msg.campaignEngagementId);

      }
    
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException(err);
      
    }
   /**
    * check we have a campaignEngagement model
    */ 
    if (campaignEngagement === undefined || campaignEngagement === null) {

      throw new NotFoundException('Existing campaingEngagement not found for [' + msg.campaignEngagementId + ']');

    }

   /**
    * add a communication for this outbound message
    */
    try {

      const c = { direction: SendService.OUT,
      msgDate: new Date(),
      businessAction: msg.businessAction,
      type: comms.invitationChannel,
      coverage: false,}

      communication = await campaignEngagement.communication.create(c);
      campaignEngagement.communication.push(communication);
      await campaignEngagement.save();
    
    } catch(err) {

      throw new InternalServerErrorException(err);

    }
    

   /**
    * send the invitation
    */
    try {

      // tslint:disable-next-line: no-console
      console.log('INFO: sending followup to to tribeId [' + msg.tribeId + '] for campaignTribeId [' + msg.campaignTribeId + ']');
        
      const invitation: Invitation = new Invitation();
      invitation.businessAction = msg.businessAction;
      invitation.channelType = comms.invitationChannel;
      invitation.recipient = comms.recipient;
      invitation.sender = engagement.sender;
      invitation.meta.campaignId = msg.campaignId;
      invitation.meta.campaignTribeId = msg.campaignTribeId;
      invitation.meta.tribeId = msg.tribeId;
      invitation.meta.campaignEngagementId = campaignEngagement.id;
      invitation.meta.communicationId = communication.id;    
      invitation.content.influencerFirstName = comms.influencerFirstName;
      invitation.content.subject = engagement.subject;
      invitation.content.body = engagement.template;
      invitation.content.tracker = 'ref:' + campaignEngagement.id + '/' + communication.id;
            
      await this.channelsApiService.send(invitation);

    } catch (err) {

      throw new InternalServerErrorException(err);

    } 


  }

  /**
   * returns a campaign projected on engagement and products 
   * 
   * @param campaignId 
   * @param orgId 
   * 
   * @return Promise<Campaign> where cmapaign is projected onto a engagment profile
   */
  private async getCampaignInvitationContent(campaignId: string, orgId: string): Promise<Campaign> {

    let campaign: Model<Campaign>;
    try {

      const filter = { _id: campaignId,  serviceOrgId: orgId };
      const projection = { engagement: 1, products: 1, name: 1, targetOrgId: 1, serviceOrgId: 1};
      campaign = await this.campaignModel.findOne(filter, projection).exec();

     /**
      * if no campaign throw exception
      */ 
      if (campaign === null) {
       
        throw new NotFoundException('No campaign found for campaignId [' + campaignId + '] serviceOrgId [' + orgId + ']');
        
      }

      return campaign;

    } catch (err) {

      /**
       * exception handling managed by caller
       */
      throw new InternalServerErrorException(err);

    }

  }
  
  /**
   * helper function to get a specific engagement sub document from a campaign.
   * Throws an exception if no engagement found.
   */
  private getCampaignEngagement(campaign: Campaign, businessAction: string, channelType: string): Engagement {

    if (undefined === campaign.engagement || campaign.engagement.length === 0) {

      throw new NotFoundException('No engagements in campaign [' + campaign._id + ']');

    }
  
    const engagement: any = campaign.engagement.find((e: any) => {
        return ((e.channelType === channelType) && (e.useCase === businessAction));
    });

    if (undefined === engagement) {

      throw new NotFoundException('Cant find an engagement for business action [' + businessAction + '], channelType [' + channelType + '] in campaign [' + campaign._id +']');

    }

    return engagement;
    
  }

  

}