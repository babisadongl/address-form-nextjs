'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo-client';
import AddressForm from './components/address-form';

const MyApp = () => (
  <ApolloProvider client={client}>
    <AddressForm />
  </ApolloProvider>
);

if (typeof window !== 'undefined' && document) {
  const rootElement = document.getElementById('root') as HTMLElement;

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<MyApp />);
  }
}

export default MyApp;
