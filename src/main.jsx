import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './styles/index.css'; // tailwind entry or plain css
import { saveStateToLocal } from './utils/localStorage';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// subscribe to store to persist
store.subscribe(() => {
  saveStateToLocal(store.getState());
});
