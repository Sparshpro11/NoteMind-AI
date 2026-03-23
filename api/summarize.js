export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ summary: "Only POST allowed" });
  }

  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ summary: "No input text provided" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ summary: "API key not set!" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Summarize this in simple points:\n${text}`,
      }),
    });

    const data = await response.json();

    const summary =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "No summary generated";

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ summary: `Error: ${err.message}` });
  }
}