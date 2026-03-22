async function summarizeText() {
  const input = document.getElementById("inputText").value;
  const output = document.getElementById("outputText");

  if (!input.trim()) {
    output.innerHTML = "⚠️ Please enter text.";
    return;
  }

  output.innerHTML = "⏳ Summarizing...";

  try {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    const data = await response.json();
    output.innerHTML = data.result;

  } catch (error) {
    output.innerHTML = "❌ Error: " + error.message;
  }
}