import { useState } from 'react'

export default function AutographEntryForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/autographs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })

      if (response.ok) {
        alert('Autograph submitted successfully!')
        setName('')
        setMessage('')
      } else {
        alert('Failed to submit autograph. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting autograph:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full border p-2"
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Autograph
      </button>
    </form>
  )
}