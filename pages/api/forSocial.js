import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log(req.body);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "API key issue",
      },
    });
    return;
  }

  const {
    noOfWords,
    urlOfPage,
    whichSocial,
    geo,
    tonality,
    keywords,
    targetAudience,
    addGoalHere,
  } = req.body;
  if (
    !noOfWords ||
    !urlOfPage ||
    !whichSocial ||
    !geo ||
    !tonality ||
    !keywords ||
    !targetAudience ||
    !addGoalHere
  ) {
    res.status(400).json({
      error: {
        message: "Please provide all required fields",
      },
    });
    return;
  }

  try {
    const prompt = `Create ${noOfWords} words social media post content for the link "${urlOfPage}" to publish it in ${whichSocial} page. The characteristics to take into account are the following: descriptive, in ${geo}-english. The tone of the post content should be ${tonality}. Use emphasis style to highlight keywords "${keywords}" . The target audience are ${targetAudience}. To be used at an ongoing basis with the goal to ${addGoalHere}.`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.6,
      max_tokens: noOfWords * 10,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
}
