import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect()
    const database = client.db('autographs')
    const collection = database.collection('entries')

    if (req.method === 'POST') {
      const { name, message } = req.body
      const result = await collection.insertOne({ name, message, createdAt: new Date() })
      res.status(201).json(result)
    } else if (req.method === 'GET') {
      const entries = await collection.find().sort({ createdAt: -1 }).toArray()
      res.status(200).json(entries)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing your request.' })
  } finally {
    await client.close()
  }
}
