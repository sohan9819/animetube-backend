import express from 'express';

const PORT = 3000;
const HOST = 'localhost';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, HOST, () => {
  console.log(
    `Connected to server \nProject is running at http://${HOST}:${PORT}/`
  );
});
