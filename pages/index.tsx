import { useState } from 'react'
import PasswordProtection from '../components/PasswordProtection'
import AutographEntryForm from '../components/AutographEntryForm'
import AutographDisplay from '../components/AutographDisplay'

export default function Home() {
  const [writeAccess, setWriteAccess] = useState(false)
  const [readAccess, setReadAccess] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200">
      <main className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">Treasured Scribbles</h1>
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
