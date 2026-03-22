const input = document.getElementById("inputText").value;

const res = await fetch("/api/summarize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: input }),
});

const data = await res.json();
document.getElementById("output").innerText = data.summary;