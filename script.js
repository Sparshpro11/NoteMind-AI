document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const input = document.getElementById("inputText").value;

  if (!input) {
    document.getElementById("output").innerText = "Please enter some text!";
    return;
  }

  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    document.getElementById("output").innerText = data.summary;
  } catch (err) {
    document.getElementById("output").innerText = `Error: ${err.message}`;
  }
});