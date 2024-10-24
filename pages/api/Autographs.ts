import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect()
    const database = client.db('treasured_scribbles')
    const autographs = database.collection('autographs')

    if (req.method === 'POST') {
      const newAutograph = {
        ...req.body,
        createdAt: new Date()
      }
      const result = await autographs.insertOne(newAutograph)
      res.status(201).json(result)
    } else if (req.method === 'GET') {
      const result = await autographs.find().sort({ createdAt: -1 }).toArray()
      res.status(200).json(result)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    await client.close()
  }
}