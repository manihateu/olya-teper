import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } else if (req.method === 'POST') {
    const { title, author, pdfUrl } = req.body;
    const book = await prisma.book.create({
      data: { title, author, pdfUrl },
    });
    res.status(201).json(book);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}