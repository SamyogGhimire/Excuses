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
            Return ONLY raw valid JSON.

            DO NOT use markdown.
            DO NOT wrap the response in json.
            DO NOT add explanations.
                    
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

  try {

  const rawContent =
    response.data.choices[0].message.content;

  const cleanedContent = rawContent
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsedData =
    JSON.parse(cleanedContent);

  return parsedData;

} catch (error) {

  console.error(
    "Failed to parse AI response:",
    error
  );

  throw new Error(
    "Invalid AI JSON response"
  );
}

};

module.exports = {
  generateExcuseFromAI
};