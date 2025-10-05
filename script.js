const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('You', message);
  userInput.value = '';

  const response = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  appendMessage('Senal AI', data.reply);
}

function appendMessage(sender, message) {
  const p = document.createElement('p');
  p.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
