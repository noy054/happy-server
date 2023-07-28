const Twilio = require("twilio");
// const ArrivalsListModel = require("../src/models/ArrivalsListModel");
// const arrivalsController = require("../src/controllers/arrivalsController");
exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();

  const { OriginalRepliedMessageSid, From, ButtonPayload, twiml } = event;

  const phone = From.split(":")[1];
  console.log("phone", phone);

  try {
    const twiml = new Twilio.twiml.MessagingResponse();

    client.sync
      .services(context.SYNC_SERVICE_SID)
      .syncMaps(context.SYNC_MAP_SID)
      .syncMapItems(`${phone}_${OriginalRepliedMessageSid}`)
      .fetch()
      .then((result) => {
        console.log(result.data);
        const contact = result.data;

        switch (contact.contentSid) {
          case "HXd47f1233df00cb1fe569bcf1d7f02601": // TODO: replace this placeholder with your content SID
            if (ButtonPayload === "yes") {
              twiml.message(
                "נרשמת בהצלחה. נשמח לראותך, הראה הודעה זאת ביום החלוקה "
              );
              // return From;
              //  ArrivalsListModel.create()
            } else if (ButtonPayload === "no") {
              twiml.message(
                "מודים לך על העדכון שמאפשר למשפחה אחרת להגיע במקומך"
              );
            } else {
              twiml.message("תודה!");
            }

            break;

          default:
            twiml.message(
              "We couldn't find a context with you. What would you like to talk about?"
            );
        }

        callback(null, twiml);
        // noyy(From);
      })
      .catch((err) => {
        if (err.code === 20404) {
          // Twilio error in case no context is found
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
