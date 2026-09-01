import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MessageProvider } from './context/Message.context.jsx';

createRoot(document.getElementById('root')).render(
  <MessageProvider>
    <App />
  </MessageProvider>
);
