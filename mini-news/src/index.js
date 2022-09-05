import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { Provider } from 'react-redux';
// import { PersistGate } from "redux-persist/integration/react";
import store from './store.js';
// import { persistStore } from "redux-persist";
// import { store, persistor } from "app/store"; // 리덕스 툴킷
// const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <GlobalStyle/>
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
