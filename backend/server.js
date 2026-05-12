const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/generate",async (req,res) =>{
    const { context, category } = req.body;
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content:
                        "You are an expert excuse generator..."
                    },
                    {
                        role: "user",
                        content: `
                            Return ONLY valid JSON.
                    
                            Format:
                    
                            {
                            "excuse": "",
                            "shortVersion": "",
                            "believabilityScore": "",
                            "riskLevel": ""
                            }
                    
                            Category: ${category}

                            Situation:
                            ${context}
                            `
                    }
                ]
            },
            {
                headers:{
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type":"application/json"
                }
            }
        );

        const content = response.data.choices[0].message.content;
        let parsed;

        try {
          parsed = JSON.parse(content);
        
        } catch (err) {
          console.log(content);
        
          return res.status(500).json({
            error: "Invalid JSON from AI"
          });
      
        }
        res.json({ parsed });
    } catch(error){
        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});