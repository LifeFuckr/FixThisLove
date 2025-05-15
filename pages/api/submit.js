export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.length < 1 || message.length > 1000) {
    return res.status(400).json({ error: 'Invalid message' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No response.';

    return res.status(200).json({ success: true, aiResponse });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: "Failed to generate response" });
  }
}