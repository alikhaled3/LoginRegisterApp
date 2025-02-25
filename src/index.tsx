import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './apollo/client';

import './index.css';

const container = document.getElementById('root');


const root = createRoot(container!); // Use non-null assertion (!) to ensure container is not null


root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);