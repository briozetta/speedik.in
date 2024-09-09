"use client"; // This file is now a Client Component

import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
