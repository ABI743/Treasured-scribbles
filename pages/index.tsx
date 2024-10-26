import { useState } from 'react'
import Head from 'next/head'

interface Entry {
  name: string;
  message: string;
  date: string;
}

export default function Home() {
  const [view, setView] = useState<'home' | 'writePassword' | 'readPassword' | 'write' | 'read'>('home')
  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [currentEntry, setCurrentEntry] = useState<{ name: string; message: string }>({ name: '', message: '' })

  const handlePasswordSubmit = (type: 'write' | 'read') => {
    const correctPassword = type === 'write' ? 'Treasure123' : 'ABIN1john'
    if (password === correctPassword) {
      setView(type)
    } else {
      alert('Incorrect password')
    }
    setPassword('')
  }

  const handleEntrySubmit = () => {
    if (currentEntry.name && currentEntry.message) {
      setEntries([...entries, { ...currentEntry, date: new Date().toLocaleString() }])
      setCurrentEntry({ name: '', message: '' })
      alert('Entry saved successfully!')
    } else {
      alert('Please fill all fields')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200">
      <Head>
        <title>Treasured Scribbles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">Treasured Scribbles</h1>
        
        {view === 'home' && (
          <div>
            <p className="text-center mb-4">Hi 👋 from Abin, feel free to add any memories or writings to the Treasured Scribbles.</p>
            <div className="flex justify-center">
              <button onClick={() => setView('writePassword')} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Write</button>
              <button onClick={() => setView('readPassword')} className="bg-green-500 text-white px-4 py-2 rounded">View</button>
            </div>
          </div>
        )}

        {(view === 'writePassword' || view === 'readPassword') && (
          <div>
            <h2 className="text-2xl mb-4">Enter Password to {view === 'writePassword' ? 'Write' : 'View'}</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter password"
            />
            <button 
              onClick={() => handlePasswordSubmit(view === 'writePassword' ? 'write' : 'read')}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button onClick={() => setView('home')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
          </div>
        )}

        {view === 'write' && (
          <div>
            <h2 className="text-2xl mb-4">Write a New Entry</h2>
            <input
              type="text"
              value={currentEntry.name}
              onChange={(e) => setCurrentEntry({...currentEntry, name: e.target.value})}
              className="border p-2 w-full mb-4"
              placeholder="Your Name"
            />
            <textarea
              value={currentEntry.message}
              onChange={(e) => setCurrentEntry({...currentEntry, message: e.target.value})}
              className="border p-2 w-full mb-4"
              placeholder="Your Message"
              rows={4}
            ></textarea>
            <button onClick={handleEntrySubmit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save Entry</button>
            <button onClick={() => setView('home')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
          </div>
        )}

        {view === 'read' && (
          <div>
            <h2 className="text-2xl mb-4">View Entries</h2>
            {entries.map((entry, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <h3 className="font-bold">{entry.name}</h3>
                <p>{entry.message}</p>
                <p className="text-sm text-gray-500">Date: {entry.date}</p>
              </div>
            ))}
            <button onClick={() => setView('home')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
          </div>
        )}
      </main>
    </div>
  )
}
