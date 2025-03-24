import { useState, useEffect } from 'react';
import "@/styles/globals.css"

export default function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  console.log(fileUrl)
  const addBook = async () => {
  let pdfUrl = null;
  if (pdfFile) {
    const formData = new FormData();
    formData.append('file', pdfFile);

    const uploadRes = await fetch('/api/books/upload', {
      method: 'POST',
      body: formData,
    });
    const uploadData = await uploadRes.json();
    pdfUrl = uploadData.pdfUrl;
  }

  const res = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, pdfUrl }),
  });

  const newBook = await res.json();
  setBooks([...books, newBook]);
  setTitle('');
  setAuthor('');
  setPdfFile(null);
};

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Менеджер книг</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 rounded-xl"
        />
        <input
          type="text"
          placeholder="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 mr-2 rounded-xl"
        />
        <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border p-2 mb-2 rounded-xl"
        />
        <button onClick={addBook} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-xl">
          Добавить
        </button>
      </div>

      <ul>
        {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center border-b py-2">
            <div>
                <strong>{book.title}</strong> - {book.author}
            </div>
            <div>
                <a
                    href={`/${book.id}`}
                    className="bg-green-500 text-white px-2 py-1 rounded-xl mr-2"
                >
                Прочитать
                </a>
                <button
                    onClick={() => deleteBook(book.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-xl"
                >
                Удалить
                </button>
            </div>
            </li>
        ))}
        </ul>
    </div>
  );
}