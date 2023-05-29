import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { APIResponse } from "mailersend/lib/services/request.service";
import { MailParamType } from "../types/UtilsTypes";

const Mail = async ({
  firstName,
  lastName,
  confirmationId,
  email,
}: MailParamType): Promise<APIResponse> => {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY ?? "",
  });

  const sentFrom = new Sender("lionpay@onfranciis.dev", "LionPay");

  const recipients = [new Recipient(email, `${firstName} ${lastName}`)];

  const personalization = [
    {
      email: email,
      data: {
        store: { name: "LionPay" },
        customer: { first_name: firstName },
        user: {
          confirm_email: `https://lionpay.onfranciis.dev/confirmation/${confirmationId}`,
        },
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Email confirmation from LionPay")
    .setTemplateId("z3m5jgr93y0gdpyo")
    .setPersonalization(personalization);

  return await mailerSend.email.send(emailParams);
};

export default Mail;
