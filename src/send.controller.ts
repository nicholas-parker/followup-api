import { Controller, Post, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { SendService } from './send.service';
import { SendMessage } from './sendMessage';

/**
 * 
 * A controller which exposes endpoints that ultimately send engagement to a tribe member
 * within a sampling campaign context
 * 
 */
@Controller('send')
export class SendController {
  constructor(private readonly sendService: SendService) {}

  /**
   * Send a followup request to a tribe member within a sampling campaing context.
   * This endpoint is expecting a pubsub message delivered over HTTP. 
   * To send to this endpoint place a message on the send-followup topic
   * 
   * @param body 
   */
  @Post('pubsub')
  public sendPUBSUB(@Body() pubsubmsg) {

    // deserialise
    let event: SendMessage;
    try {

        const buff = new Buffer(pubsubmsg.message.data, 'base64');
        const strEvent = buff.toString('ascii');
        event = JSON.parse(strEvent) as SendMessage;

        // tslint:disable-next-line: no-console
        console.log('INFO: send message event received ' + strEvent);

    } catch (e) {

        throw new InternalServerErrorException('message data is not a json object', 'message data is not a json object');

    }

    // thow 400/BadRequestException on validation error
    // the topic will retry the message until the retry policy is complete
    // the topic will then place it on the dead letter queue
    let err = ''; 
    if (event.businessAction === undefined) {
      err = 'businessAction is undefined. ';
    }
    if (event.campaignEngagementId === undefined) {
      err = err + 'campaignEngagementId is undefined. '; 
    }
    if (event.campaignId === undefined) {
      err = err + 'campaignId is undefined. '; 
    }
    if (event.campaignTribeId === undefined) {
      err = err + 'campaignTribeId is undefined. '; 
    }
    if (event.orgId === undefined) {
      err = err + 'orgId is undefined. '; 
    }
    if (event.tribeId === undefined) {
      err = err + 'tribeId is undefined. '; 
    }
    if (err.length > 0) {
      throw new BadRequestException(err);
    }

    // do the work
    this.sendService.send(event);
  }

  /**
   * Send a followup request to a tribe member within a sampling campaing context.
   * This endpoint is expecting a pubsub message delivered over HTTP. 
   * To send to this endpoint place a message on the send-followup topic
   * 
   * @param body 
   */
  @Post('rest')
  public async sendREST(@Body() event) {

    // thow 400/BadRequestException on validation error
    // the topic will retry the message until the retry policy is complete
    // the topic will then place it on the dead letter queue
    let err = ''; 
    if (event.businessAction === undefined) {
      err = 'businessAction is undefined. ';
    }
    if (event.campaignId === undefined) {
      err = err + 'campaignId is undefined. '; 
    }
    if (event.campaignTribeId === undefined) {
      err = err + 'campaignTribeId is undefined. '; 
    }
    if (event.orgId === undefined) {
      err = err + 'orgId is undefined. '; 
    }
    if (event.tribeId === undefined) {
      err = err + 'tribeId is undefined. '; 
    }
    if (err.length > 0) {
      throw new BadRequestException(err);
    }

    // do the work
    try {

      await this.sendService.send(event);

    } catch(err) {

      console.log(err);
      throw new InternalServerErrorException(err);

    }
    
        
  }


}