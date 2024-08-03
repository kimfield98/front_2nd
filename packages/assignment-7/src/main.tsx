import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';

async function prepare() {
  try {
    const { setupWorker } = await import('msw/browser');
    const { mockApiHandlers } = await import('./mockApiHandlers');
    const worker = setupWorker(...mockApiHandlers);
    await worker.start();
  } catch (error) {
    console.error('Failed to start the worker:', error);
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
});
