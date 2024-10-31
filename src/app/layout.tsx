import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { Slide, ToastContainer } from 'react-toastify';

import { ibmPlexMono, ibmPlexSans, inter, leagueSpartan } from '@/fonts';

import { Providers } from './providers';
import Footer from '@/components/footer';
import Header from '@/components/header';

import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { config } from '@/configs/wagmi';

export const metadata: Metadata = {
  title: 'SLA Layer',
  description: 'Infrastructure Guarantees as a Service',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get('cookie'),
  );
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} ${leagueSpartan.variable}`}
    >
      <body
        className={`bg-background flex flex-col min-h-screen font-leagueSpartan`}
      >
        <Providers initialState={initialState}>
          <Header />

          <main className="flex-grow flex flex-col items-center">
            {children}
          </main>
          <Footer />
          <ToastContainer
            theme="dark"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            draggable={false}
            transition={Slide}
            autoClose={5000}
          />
        </Providers>
      </body>
    </html>
  );
}
