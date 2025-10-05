export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Gemini AI API
    const response = await fetch('https://api.gemini.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.reply || "Sorry, no response." });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
