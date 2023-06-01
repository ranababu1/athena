import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "API key issue",
      },
    });
    return;
  }

  const { topic, maxWordLimit } = req.body;
  if (!topic || !maxWordLimit) {
    res.status(400).json({
      error: {
        message: "Please provide all required fields",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a oneliner about ${topic} within ${maxWordLimit} words.`,
      temperature: 0.6,
      max_tokens: maxWordLimit * 5, // Assuming an average of 5 tokens per word
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};
