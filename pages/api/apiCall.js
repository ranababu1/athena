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

  const { topic, focusKeyword, length, targetAudience, writersPersona } = req.body;
  if (!topic || !focusKeyword || !length || !targetAudience || !writersPersona) {
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
      prompt: generatePrompt(topic, focusKeyword, length, targetAudience, writersPersona),
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // ...
  }
}

function generatePrompt(topic, focusKeyword, length, targetAudience, writersPersona) {
  return `Consider yourself as ${writersPersona} and write a SEO optimized blog post for better search engine rankings about the ${topic} using the focus keyword ${focusKeyword} targeted at audience from ${targetAudience} region. The blog post should be approximately ${length} words long. Repeat the focus keyword few times in headings as well as in paragraph naturally. Use transition words. Use related keywords as well as synonyms of the focus keyword throughout the content. Create a meta description within 150-160 characters containing the focus keyword and add it to the end of the blog post as a separate paragraph. Create a good slug containing the focus keyword for this post in a new line in last paragraph.`;
}