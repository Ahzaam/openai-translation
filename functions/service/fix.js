const openai = require("./openaiconfig");

exports.fixEveryThing = (prompt) => {
  return new Promise(async (resolve, reject) => {
    const request = {
      model: "text-davinci-edit-001",
      input: prompt,
      instruction: "translate to english and fix grammer",
    };
    console.log(prompt);

    const response = await openai.createEdit(request);
    resolve(response.data.choices[0].text);
  });
};
