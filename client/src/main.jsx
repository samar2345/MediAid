import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { MantineProvider } from '@mantine/core';
import App from './App';
// import store from './store';
import './index.css';
import store from './components/store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        
          <App />
        
    </Provider>
  </StrictMode>
);
