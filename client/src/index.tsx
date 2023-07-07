import { createRoot } from 'react-dom/client';
import './firebase/initApp';

import { App } from './app/App';

import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store/store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root') as Element);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);