import { Inter } from 'next/font/google';
import { ErrorBoundary } from 'react-error-boundary';

import './globals.css';
import ErrorPage from './components/pages/error';
import ReduxProvider from './providers/reduxProvider';
import StyledComponentsProvider from './providers/styledComponentsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Projects Manager',
  description: 'A service that manages projects',
};

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsProvider>
          <ReduxProvider>
            <ErrorBoundary FallbackComponent={ErrorPage}>
              {children}
            </ErrorBoundary>
          </ReduxProvider>
        </StyledComponentsProvider>
      </body>
    </html>
  );
}

export default RootLayout;
