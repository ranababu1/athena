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

  const { contentText, outputFormat, maxWordLimit } = req.body;
  if (!contentText || !outputFormat || !maxWordLimit) {
    res.status(400).json({
      error: {
        message: "Please provide all required fields",
      },
    });
    return;
  }

  const chunks = splitTextIntoChunks(contentText, 4096);
  let finalSummary = '';

  try {
    for (let chunk of chunks) {
      const prompt = generatePrompt(chunk, outputFormat, maxWordLimit);

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.5,
        max_tokens: 60,
      });

      finalSummary += completion.data.choices[0].text + '\n';
    }

    res.status(200).json({ result: finalSummary });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function splitTextIntoChunks(text, maxTokens) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxTokens) {
    chunks.push(text.slice(i, i + maxTokens));
  }
  return chunks;
}

function generatePrompt(contentText, outputFormat, maxWordLimit) {
  let prompt = `I read the following text:\n\n${contentText}\n\n`;

  if (outputFormat === "points") {
    prompt += "Can you summarize this in bullet points?";
  } else {
    prompt += "Can you summarize this in a short paragraph?";
  }

  if (maxWordLimit) {
    prompt += ` The summary should not exceed ${maxWordLimit} words.`;
  }

  return prompt;
}
