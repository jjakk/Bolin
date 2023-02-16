const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
            You're name is Bolin. Process the following command:
            "${message}" 
        `,
        temperature: 0
    });

    if(response.data.choices[0].text){
        res.json({ message: response.data.choices[0].text });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});