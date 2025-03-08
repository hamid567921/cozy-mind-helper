
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log a message to help users know the app is starting
console.log('🚀 Starting application...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found! Make sure there is a div with id="root" in index.html');
} else {
  createRoot(rootElement).render(<App />);
  console.log('✅ Application mounted successfully!');
}
