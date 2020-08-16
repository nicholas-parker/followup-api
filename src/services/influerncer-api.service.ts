import { Injectable } from '@nestjs/common';
import { LmpApiService } from './LMP-API.service';
import { TribeCommsDetails } from './TribeCommsDetails';

/**
 *
 * This service provides an HTTP client for the Influencer API
 * There is no security yet applied
 *
 */
@Injectable()
export class InfluencerAPIService {

 readonly HOST = 'influencer-api-dot-nvp-1-214110.ew.r.appspot.com';
 readonly BaseUrl = 'influencer';

 constructor(private httpService: LmpApiService) { }

 /**
  * returns the selected communication details for the tribe member.
  * Throws an AxiosError object when there is an error, the error logging
  * and ticket raising is managed inside the LmpApiService.  This method
  * re-throws the error so the calling function can manage the process.
  *
  * @param tribeId _id of the tribe member we want to communicate with
  */
 public async getInfluencerCommsChannel(tribeId: string): Promise<TribeCommsDetails> {

    const path = tribeId + '/prefered-comms';
    const url = this.getFullPath(path);

    return await this.httpService.get<TribeCommsDetails>(url);

 }

 /**
  * Internal method
  * Builds the full URL path from the API Host, BaseURL and the path provided in the call
  *
  * @param path The path to append to the base path to create the REST endpoint URL
  *
  */
 private getFullPath(path: string): string {

    return 'https://' + this.HOST + '/' + this.BaseUrl + '/' + path;

 }

}
