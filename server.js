// console.log("hello world")
// console.log(process.env.AZURE_OPENAI_API_KEY)
// import { AzureChatOpenAI } from "@langchain/openai"
//
// const llm = new AzureChatOpenAI({
//     temperature: 1
// });
//
// const response = await llm.invoke("Hoe ziet een k hole er fysiek uit.  Veel detail");
// console.log(response.content);

import express from 'express'
// server.js
import { callAssistant } from './chat.js'

const app = express()
app.use(express.json())

app.get('/api/test', async (req, res) => {
    const response = await callAssistant("why do parrots talk?")
    res.json({ response })
})

app.post('/api/chat', async(req, res) => {
    const { message } = req.body
    const response = await callAssistant(message)
    res.json(response)
})

app.use(express.static("public"));
app.listen(3000, () => console.log(`Server on http://localhost:3000`))
