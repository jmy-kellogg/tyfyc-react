import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resumeRecommendations = async ({ summary, description }) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that improves a resume summary section for a given job posting.",
        },
        {
          role: "user",
          content: `Improve this resume summary: "${summary}" optimized from this job posting description "${description}"`,
        },
      ],
    });

    const responseMessage = completion.choices[0].message.content || "";
    return {
      summary: responseMessage,
      description: description,
    };
  } catch {
    return {
      summary: summary,
      description: description,
    };
  }
};

export default resumeRecommendations;
