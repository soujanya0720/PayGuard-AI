const message = document.getElementById("message");
const count = document.getElementById("char-count");
const analyzeBtn = document.getElementById("analyze-btn");
const errorEl = document.getElementById("error-message");
const results = document.getElementById("results");

message.addEventListener("input", () => {
  count.textContent = `${message.value.length.toLocaleString()} / 5,000 characters`;
  errorEl.textContent = "";
});
document.querySelectorAll(".example").forEach(button => {
  button.addEventListener("click", () => {
    message.value = button.dataset.example;
    message.dispatchEvent(new Event("input"));
    message.focus();
  });
});

analyzeBtn.addEventListener("click", async () => {
  const text = message.value.trim();
  errorEl.textContent = "";
  if (text.length < 8) {
    errorEl.textContent = "Please enter a message with at least 8 characters.";
    message.focus();
    return;
  }
  analyzeBtn.disabled = true;
  analyzeBtn.querySelector("span:first-child").textContent = "Analyzing…";
  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: text})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not analyze this message.");
    showResults(data);
  } catch (error) {
    errorEl.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.querySelector("span:first-child").textContent = "Analyze message";
  }
});

function showResults(data) {
  document.getElementById("score").textContent = data.score;
  document.getElementById("risk-title").textContent = data.title;
  document.getElementById("risk-summary").textContent = data.summary;
  const ring = document.getElementById("score-ring");
  ring.style.background = `conic-gradient(${data.level === "high" ? "#dc4545" : data.level === "medium" ? "#e3a128" : "#6258e8"} ${data.score * 3.6}deg, #e9e8f8 0deg)`;
  const pill = document.getElementById("risk-pill");
  pill.className = `risk-pill ${data.level === "low" ? "" : data.level}`;
  pill.textContent = data.level.toUpperCase() + " INDICATOR";
  const list = document.getElementById("signals-list");
  list.replaceChildren();
  if (!data.signals.length) {
    const empty = document.createElement("div");
    empty.className = "no-signals";
    empty.textContent = "No matching warning patterns were detected by this demo. Stay alert—new or subtle scams may not be identified.";
    list.appendChild(empty);
  } else {
    data.signals.forEach(signal => {
      const item = document.createElement("div");
      item.className = "signal-item";
      const mark = document.createElement("span");
      mark.className = "signal-mark";
      mark.textContent = "!";
      const content = document.createElement("div");
      const title = document.createElement("b");
      title.textContent = signal.label;
      const detail = document.createElement("p");
      detail.textContent = signal.detail;
      content.append(title, detail);
      item.append(mark, content);
      list.appendChild(item);
    });
  }
  const tips = document.getElementById("tips-list");
  tips.replaceChildren();
  data.tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    tips.appendChild(li);
  });
  document.getElementById("disclaimer").textContent = data.disclaimer;
  results.classList.remove("hidden");
  results.scrollIntoView({behavior: "smooth", block: "start"});
}

document.getElementById("reset-btn").addEventListener("click", () => {
  results.classList.add("hidden");
  message.value = "";
  message.dispatchEvent(new Event("input"));
  message.focus();
});
