const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY =
  "";

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "message",
    sender === "user" ? "user-message" : "bot-message"
  );
  messageDiv.innerHTML = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(userMessage) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't connect to AI.";
  }
}

sendBtn.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (userMessage.length < 3) {
    alert("Please type at least three characters.");
    return;
  }
  addMessage(userMessage, "user");
  userInput.value = "";

  const aiResponse = await getAIResponse(userMessage);
  addMessage(aiResponse, "bot");
});

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});
