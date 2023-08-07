const Twilio = require("twilio");
const axios = require("axios");

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();

  const { OriginalRepliedMessageSid, From, ButtonPayload } = event;

  const phone = From.split(":")[1];

  try {
    const twiml = new Twilio.twiml.MessagingResponse();

    client.sync
      .services(context.SYNC_SERVICE_SID)
      .syncMaps(context.SYNC_MAP_SID)
      .syncMapItems(`${phone}_${OriginalRepliedMessageSid}`)
      .fetch()
      .then(async (result) => {
        const contact = result.data;

        switch (contact.contentSid) {
          case "HX14ed6cfa71d68b187782ae2f2f1152d2": // TODO: replace this placeholder with your content SID
            if (ButtonPayload === "yes") {
              twiml.message(
                "נרשמת בהצלחה. נשמח לראותך, הראה הודעה זאת ביום החלוקה "
              );

              await axios.post(
                "https://2681-2a01-73c0-600-e9ee-882e-2b23-6ec7-16fc.ngrok.io/sendMessage/incoming",
                {
                  phone: phone,
                }
              );
            } else if (ButtonPayload === "no") {
              twiml.message(
                "מודים לך על העדכון שמאפשר למשפחה אחרת להגיע במקומך"
              );

              await axios.post(
                "https://2681-2a01-73c0-600-e9ee-882e-2b23-6ec7-16fc.ngrok.io/sendMessage/notComing",
                {
                  phone: phone,
                }
              );
            } else {
              twiml.message("תודה!");
            }

            if (ButtonPayload === "yes") {
            }

            break;

          default:
            twiml.message(
              "We couldn't find a context with you. What would you like to talk about?"
            );
        }

        console.log("callbeack");
        callback(null, twiml);
      })
      .catch((err) => {
        if (err.code === 20404) {
          twiml.message(
            "We couldn't find a context with you. What would you like to talk about?"
          );
          callback(null, callback);
        } else {
          console.error(err);
          callback(err);
        }
      });
  } catch (err) {
    console.error(err);
    callback(null, err);
  }
};
