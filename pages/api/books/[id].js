import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Book deleted' });
  } 
  if (req.method === "GET") {
    const { id } = req.query;
    const book = await prisma.book.findFirst({
        where: { id: parseInt(id) }
    })
    res.status(200).json(book)
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}