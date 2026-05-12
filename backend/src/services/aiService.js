const axios = require("axios");

const generateExcuseFromAI = async (
  context,
  category
) => {

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",

    {
      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content:
            "You are an expert excuse generator."
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

Category:
${category}

Situation:
${context}
`
        }

      ]
    },

    {
      headers: {
        Authorization:
          `Bearer ${process.env.GROQ_API_KEY}`,

        "Content-Type":
          "application/json"
      }
    }
  );

  const content =
    response.data.choices[0].message.content;

  return JSON.parse(content);

};

module.exports = {
  generateExcuseFromAI
};