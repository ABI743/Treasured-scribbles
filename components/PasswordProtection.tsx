import { useState } from 'react'

interface PasswordProtectionProps {
  onWriteAccess: () => void;
  onReadAccess: () => void;
}

export default function PasswordProtection({ onWriteAccess, onReadAccess }: PasswordProtectionProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent, type: 'write' | 'read') => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, password }),
      })

      const data = await response.json()

      if (data.isValid) {
        type === 'write' ? onWriteAccess() : onReadAccess()
      } else {
        setError('Invalid password. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, 'write')} className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter write password"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Write Access
        </button>
      </form>
      <form onSubmit={(e) => handleSubmit(e, 'read')}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter read password"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Read Access
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}