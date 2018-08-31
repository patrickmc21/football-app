import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Reducers';
import './reset.css';
import './index.css';
import App from './Containers/App/App';
import registerServiceWorker from './registerServiceWorker';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  devTools
);

const fantasyApp = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(fantasyApp, document.getElementById('root'));
registerServiceWorker();
