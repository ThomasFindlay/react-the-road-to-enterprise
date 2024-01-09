import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('An element with id "root" was not found.');
}

declare global {
  /* eslint-disable-next-line no-var */
  var __REACT_APP_ROOT__: Root | undefined;
}

const root = window.__REACT_APP_ROOT__ || createRoot(container);

window.__REACT_APP_ROOT__ = root;

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
