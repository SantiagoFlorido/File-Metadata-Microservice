const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Página principal
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configuración de multer
const upload = multer({ dest: 'uploads/' });

// Ruta para procesar el archivo
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('La aplicación está escuchando en el puerto ' + port);
});
