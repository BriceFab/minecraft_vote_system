import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';
import * as serviceConsole from './services/console';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'development') {
    serviceConsole.register();
}
serviceWorker.unregister();