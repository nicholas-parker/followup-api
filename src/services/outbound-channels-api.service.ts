import { Injectable } from '@nestjs/common';
import { LmpApiService } from './LMP-API.service';
import { Invitation } from './invitation';

/**
 *
 * This service provides an HTTP client for the Influencer API
 * There is no security yet applied
 *
 */
@Injectable()
export class OutboundChannelsAPIService {

 readonly HOST = 'outbound-channels-api-dot-nvp-1-214110.ew.r.appspot.com';
 readonly BaseUrl = 'outbound-comms';

 constructor(private httpService: LmpApiService) { }

 /**
  * 
  * @param invitation
  *
  */
  async send(invitation: Invitation): Promise<any> {

    const path = 'rest/send';
    const url = this.getFullPath(path);
    return await this.httpService.post<Invitation>(url, invitation);

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
