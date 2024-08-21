// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.tsx';

const app = express();
const port = 3333;

let cachedHtml = '';

function generateAndCacheHtml() {
  const app = ReactDOMServer.renderToString(<App url="/" />);
  cachedHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple SSR</title>
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
    </html>
  `;
}

generateAndCacheHtml();

app.get('*', (req, res) => {
  res.send(cachedHtml);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
