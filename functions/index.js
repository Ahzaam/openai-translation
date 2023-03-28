const functions = require("firebase-functions");
const fixing = require("./service/fix");
exports.fix = functions.https.onCall((data, context) => {
  return fixing.fixEveryThing(data.prompt);
});
