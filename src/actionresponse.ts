/**
 * class represents the response of a service action which typically results in a boolean type response
 */
export class ActionResponse {

  public ACTION_OK = 'action_ok';
  public ACTION_FAIL = 'action_fail';
  public NOT_FOUND = 'not_found';

 /*
  *  the id of the organisation initiating this action s
  */
  public orgId;

 /*
  * the id of the user creating the action
  */
  public userId;

 /*
  * the date time of the action
  */
  public dateTime;

 /*
  * a string representing the technical name of the action
  */
  public actionName;

 /*
  * The result of the action: ACTION_OK | ACTION_FAIL
  */
  public result;

 /*
  * a specific error code generated by the service
  */
  public errorCode;

 /*
  * the server side error object
  */
  public error;

 /*
  * a technical error message
  */
  public errorMessage;

 /*
  * information which is displayed to the user as a result of the action
  */
  public userInformation;

 /*
  * the key of the business entity updated or created
  */
  public issueId;

  /*
   * the entity created or updated
   */
  public data: any;
  commsCount: number;

}
