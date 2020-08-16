import { Injectable, HttpService, NotFoundException, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class LmpApiService {

    /**
     *
     * @param httpService Wrapper arpund Axios HTTP Client
     */
    constructor(private httpService: HttpService) { }

    async get<T>(url: string): Promise<T> {

        try {

            const response = await this.httpService.get<T>(url).toPromise();
            return response.data;

        } catch (err) {

            this.errorHandling(err);
        }

    }

    async post<T>(url: string, body): Promise<T> {

      try {

        const response = await this.httpService.post<T>(url, body).toPromise();
        return response.data;

    } catch (err) {

        this.errorHandling(err);
    }

    }

    /**
     * This is the standard error handling for every type of request
     *
     * @param err the Axios error object returned from the HTTP call by the Axios client
     */
    private errorHandling(error: AxiosError<any>) {

        if (error.response) {
            
          if (error.response.status >= 400 && error.response.data < 500) {
            throw new NotFoundException();
          } else {
            throw new InternalServerErrorException();
          }
        
        } else if (error.request) {
            
          // no response object therefore a timeout
          throw new RequestTimeoutException();

        } else {

          // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
        }

    }

}
