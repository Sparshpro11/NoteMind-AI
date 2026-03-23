const summarizeBtn = document.getElementById("summarizeBtn");
const inputText = document.getElementById("inputText");
const chatbox = document.getElementById("chatbox");

function addBubble(text, className) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${className}`;
  bubble.innerText = text;
  chatbox.appendChild(bubble);
  chatbox.scrollTop = chatbox.scrollHeight;
}

summarizeBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) {
    alert("Please enter some text!");
    return;
  }

  addBubble(text, "user");
  addBubble("Summarizing...", "bot");

  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    chatbox.lastChild.innerText = data.summary || "No summary generated";
  } catch (err) {
    chatbox.lastChild.innerText = `Error: ${err.message}`;
  }

  inputText.value = "";
});