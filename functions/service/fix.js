const openai = require("./openaiconfig");

exports.fixEveryThing = (prompt) => {
  return new Promise(async (resolve, reject) => {
    const request = {
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      messages: [{ role: "user", prompt }],

      temperature: 0.8,
    };
    console.log(prompt);

    const response = await openai.createEdit(request);
    resolve(response.data.choices[0].text);
  });
};
