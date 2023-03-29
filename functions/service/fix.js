const openai = require("./openaiconfig");
const admin = require("firebase-admin");
admin.initializeApp();

exports.fixEveryThing = (prompt) => {
  return new Promise(async (resolve, reject) => {
    const request = {
      model: "text-davinci-edit-001",
      input: prompt,
      instruction: "translate to english and fix grammer",
    };

    const response = await openai.createEdit(request);
    const res = response.data.choices[0].text;
    admin
      .firestore()
      .collection("generates")
      .add({ response: res, time: new Date().toDateString() });

    resolve(res);
  });
};
