export default async function handler(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ result: "No text provided" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: "Summarize this text in simple words:\n" + text
      })
    });

    const data = await response.json();

    const result =
      data.output?.[0]?.content?.[0]?.text || "No summary generated.";

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ result: "Server error" });
  }
}