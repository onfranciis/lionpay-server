import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { APIResponse } from "mailersend/lib/services/request.service";

const Mail = async (
  firstName: string,
  lastName: string
): Promise<APIResponse> => {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY ?? "",
  });

  const sentFrom = new Sender("hello@onfranciis.dev", "Your name");

  const recipients = [
    new Recipient("hello@onfranciis.dev", `${firstName} ${lastName}`),
  ];

  const personalization = [
    {
      email: "hello@onfranciis.dev",
      data: {
        store: { name: "LionPay" },
        customer: { first_name: firstName },
        user: { confirm_email: `https://lionpay.onfranciis.dev/${Date.now()}` },
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
