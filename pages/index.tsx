import { useState } from 'react'
import PasswordProtection from '../components/PasswordProtection'
import AutographEntryForm from '../components/AutographEntryForm'
import AutographDisplay from '../components/AutographDisplay'

export default function Home() {
  const [writeAccess, setWriteAccess] = useState(false)
  const [readAccess, setReadAccess] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Treasured Scribbles</h1>
        {!writeAccess && !readAccess && (
          <PasswordProtection 
            onWriteAccess={() => setWriteAccess(true)}
            onReadAccess={() => setReadAccess(true)}
          />
        )}
        {writeAccess && <AutographEntryForm />}
        {readAccess && <AutographDisplay />}
      </main>
    </div>
  )
}