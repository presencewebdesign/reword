import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@app/components';
import './index.scss';
import 'react-activity/dist/library.css';
import 'material-icons/iconfont/material-icons.css';
import { BrowserRouter } from 'react-router-dom';
import { RewordProvider, SiteSettingsProvider } from '@app/context';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider context={{}}>
      <SiteSettingsProvider>
        <RewordProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RewordProvider>
      </SiteSettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
