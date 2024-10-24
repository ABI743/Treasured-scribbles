import { useState, useEffect } from 'react'

interface Autograph {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function AutographDisplay() {
  const [autographs, setAutographs] = useState<Autograph[]>([])

  useEffect(() => {
    const fetchAutographs = async () => {
      try {
        const response = await fetch('/api/autographs')
        if (response.ok) {
          const data = await response.json()
          setAutographs(data)
        } else {
          console.error('Failed to fetch autographs')
        }
      } catch (error) {
        console.error('Error fetching autographs:', error)
      }
    }

    fetchAutographs()
  }, [])

  return (
    <div className="space-y-4">
      {autographs.map((autograph) => (
        <div key={autograph._id} className="border p-4 rounded">
          <h3 className="font-bold">{autograph.name}</h3>
          <p>{autograph.message}</p>
          <p className="text-sm text-gray-500">
            Signed on: {new Date(autograph.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}