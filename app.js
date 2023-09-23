const openai = require("openai");
const Configuration = openai.Configuration;
const OpenAIApi = openai.OpenAIApi;

//this line is for authorization
const configuration = new Configuration({
    apiKey: "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"
})

let client = new OpenAIApi(configuration);

async function getResponse() {
    let response = await client.createCompletion({
        model: "text-davinci-003",
        prompt: "write 3 lines about Earth",
        temperature: 0.6,
        max_tokens: 2000 //max number of words as a reply
    })

    console.log(response.data.choices[0].text); //response.data.choices - array
}

getResponse();