'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setResponse(data.aiResponse || 'No response');
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">FixThisLove</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 text-white"
          rows="4"
          placeholder="What do you wish you could say?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-red-500 rounded">Release It</button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <p className="text-lg font-semibold">AI Response:</p>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}