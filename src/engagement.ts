/**
 * 
 * Represents a template for an engagement with a tribe memeber within a sampling
 * campaing context.  Is a child of a campaign.
 * 
 */
export class Engagement {

      // email | sms | facebook | snapchat | twitter
      channelType: string;

      // sender, structure depends on channelType, i.e. email address for email
      sender: string;

      // template as a string, the template is processed into the message when the engagement is sent
      template: string;

      // subject
      subject: string;

      // useCase for this template: sample_invitation | .....
      useCase: string;

}