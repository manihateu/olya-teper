'use client';
import { useRouter } from 'next/router';
import { PDFWorker } from 'pdfjs-dist';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "@/styles/globals.css"
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 m-2 rounded-2xl shadow-2xl flex flex-col items-center relative">
      <a className='absolute top-3 left-3 rounded-full shadow-xl p-2 font-bold cursor-pointer' href="/">
        Назад
      </a>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="mb-4">Автор: {book.author}</p>

      {book.pdfUrl && (
        <div>
        
          <Document file={book.pdfUrl} className={"w-full max-h-[800px] overflow-hidden"} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className={"max-h-[800px]"} pageNumber={pageNumber} />
          </Document>
          <div className="">
            <p>
              Страница {pageNumber} из {numPages}
            </p>
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="bg-gray-300 px-2 py-1 rounded mr-2"
            >
              Назад
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber >= numPages}
              className="bg-gray-300 px-2 py-1 rounded"
            >
              Вперед
            </button>
          </div>
        </div>
      )}
    </div>
  );
}