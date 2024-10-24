import { NextApiRequest, NextApiResponse } from 'next'

const writePassword = 'Treasure123'
const readPassword = 'ABIN1john'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, password } = req.body

    let isValid = false

    if (type === 'write') {
      isValid = password === writePassword
    } else if (type === 'read') {
      isValid = password === readPassword
    }

    res.status(200).json({ isValid })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}