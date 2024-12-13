const express = require('express');
const app = express();
const port = 3000;

app.get('/getOptions', (req, res) => {
  // 從資料庫或其他地方取得選項
  const options = ['選項1', '選項2', ...];
  const correctAnswer = Math.floor(Math.random() * options.length);
  res.json({
    question: '這是問題',
    options,
    correctAnswer
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});