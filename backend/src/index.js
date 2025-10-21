import app from "./app.js";
import {Composio} from '@composio/core'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import {nanoid} from 'nanoid'

dotenv.config({
    path:'./.env'
})

const composio = new Composio({
    apiKey:process.env.COMPOSIO_API
})

const userId = nanoid()
const session = await composio.experimental.toolRouter.createSession(userId,{toolkits:[{toolkit:"gmail",authConfigId:'ac_hQBrrnnVuiYJ'},{toolkit:"googlemeet",authConfigId:'ac_BCIi2zRHpSZD'},{toolkit:"telegram",authConfigId:'ac_NSHnBODh0rwE'},{toolkit:"youtube",authConfigId:'ac_WYUBBnaRCGTv'}]})
const mcpUrl = session.url

const client = new OpenAI({
    apiKey:process.env.OPENAI_API
})

const port = process.env.PORT || 5000;

app.post('/',async(req,res)=>{
    try{
        const {link,answer,gmail} = req.body;
        if(!link || !gmail){
            return res.status(400).json({message:"Please fill all fields"})
        }
        const resp = await client.responses.create({
            model:'gpt-4o',
            tools:[{
                type:'mcp',
                server_label:'cmcp',
                server_url:mcpUrl,
                require_approval:'never'
            }],
            input:`Go to the youtube ${link} and send the summary of the video to ${gmail}. The user replies will be:${answer}`
        })
        if(!resp){
            return res.status(500).json({message:"Server Error",error:resp.output_text})
        }
        console.log(resp.output_text)
        return res.status(200).json(resp.output_text)
    }catch(err){
        res.status(500).json({message:"Server Error",err:err.message})
    }
})

app.listen(port,()=>{
    console.log(`App listening at port:${port}`)
})