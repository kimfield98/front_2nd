// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.tsx';

const app = express();
const port = 3333;

let cachedHtml = '';
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000;

function generateAndCacheHtml() {
  try {
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
    lastCacheTime = Date.now();
    console.log('HTML cache updated');
  } catch (error) {
    console.error('Error generating HTML:', error);
  }
}

function shouldUpdateCache() {
  return Date.now() - lastCacheTime > CACHE_DURATION;
}

app.get('*', (req, res) => {
  if (shouldUpdateCache()) {
    generateAndCacheHtml();
  }
  res.send(cachedHtml);
});

app.listen(port, () => {
  generateAndCacheHtml();
  console.log(`Server is running at http://localhost:${port}`);
});
