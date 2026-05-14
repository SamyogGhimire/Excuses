const generateExcuseFromAI = async (context, category) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an expert excuse generator."
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

              Category: ${category}
              Situation: ${context}
            `
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const rawContent = response.data.choices[0].message.content;
    const cleanedContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedContent);

  } catch (error) {
    // ✅ Now logs the REAL error (e.g. 401 invalid API key, timeout, etc.)
    console.error("Groq API error:", error.response?.data || error.message);
    throw new Error("Failed to generate excuse");
  }
};