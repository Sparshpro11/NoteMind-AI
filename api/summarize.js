export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Summarize this in simple points:\n${text}`
      })
    });

    const data = await response.json();

    // ✅ Safer extraction
    let summary = "";

    if (data.output_text) {
      // Some API versions return text here
      summary = data.output_text;
    } else if (data.output?.[0]?.content?.[0]?.text) {
      summary = data.output[0].content[0].text;
    } else {
      summary = "No summary generated";
    }

    res.status(200).json({ summary });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}