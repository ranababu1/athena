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
      }
    });
    return;
  }

  const { topic, focusKeyword, length, targetAudience } = req.body;
  if (!topic || !focusKeyword || !length || !targetAudience) {
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
      prompt: generatePrompt(topic, focusKeyword, length, targetAudience),
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(topic, focusKeyword, length, targetAudience) {
  return `Write a blog post about the topic "${topic}" using the focus keyword "${focusKeyword}" for a ${targetAudience} audience. The blog post should be approximately ${length} words long and repeat the focus keyword multiple times inside the content. Also add a meta description for the blog post:`;
}
