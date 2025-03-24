import multer from 'multer';
import { mkdirSync } from 'fs';

// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './public/uploads';
    mkdirSync(uploadDir, { recursive: true }); // Создаем папку, если её нет
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Уникальное имя файла
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Отключаем body-parser для работы с файлами
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'File upload failed', error: err });
      }

      const pdfUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({ message: 'File uploaded successfully', pdfUrl });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}