const openai = require("./openaiconfig");
const admin = require("firebase-admin");
admin.initializeApp();

exports.fixEveryThing = (prompt) => {
  return new Promise(async (resolve, reject) => {
    // const request = {
    //   model: "text-davinci-edit-001",
    //   input: prompt,
    //   instruction: `translate to english and correct grammar and spellings and shorten the paragraph `,
    // };

    // const response = await openai.createEdit(request);
    // const sum_res = response.data.choices[0].text;

    // console.log(sum_res);
    const sum_request = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
           Instruction : Please translate this paragraph into English, correct any grammatical and spelling errors,
           and shorten it without altering the meaning. Additionally, maintain a formal tone in the paragraph.
           Pargraph :  "${prompt}" `,
        },
      ],
    };

    const sum_response = await openai.createChatCompletion(sum_request);
    const sum_res = sum_response.data.choices[0].message.content;

    admin
      .firestore()
      .collection("generates")
      .add({ response: sum_res, time: new Date().toDateString() });

    resolve(sum_res);
  });
};
