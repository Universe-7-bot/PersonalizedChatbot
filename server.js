const express = require("express");
const app = express();
// const fs = require("fs");
const openai = require("openai");
const Configuration = openai.Configuration;
const OpenAIApi = openai.OpenAIApi;

//this line is for authorization
const configuration = new Configuration({
    apiKey: "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"
})

let client = new OpenAIApi(configuration);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/question", async (req, res) => {
    let question = req.body.question;
    // let policy = fs.readFileSync("leave.txt").toString();
    // let query = "Hello this is my company policy: " + policy + " and based on this policy answer as an HR and question is " + question + " and if the question is different and not related to company policy then reply I can only answer related to our company policy";

    // let resume = fs.readFileSync("resume.txt").toString();
    // let query = "Hello, this is my resume: " + resume + " and based on the information provided in the resume answer as your are my assistant and the question is " + question + " and if the question is different and not related to the resume then reply I can only answer related to Sohan's resume, thank you :)";

    question = 'If anyone says "hi" to you then you should have to reply "Hi there! How can I help you?" and for other question, reply in your own perfectly to the question: ' + question;

    let response = await client.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.6,
        max_tokens: 1000 //max number of words as a reply
    })

    let message = response.data.choices[0].text;
    // console.log(message);
    res.json({ msg: message });
})

app.listen(3000, (err) => {
    if (err) console.log(err);
    else console.log("Server is running on PORT: 3000");
})