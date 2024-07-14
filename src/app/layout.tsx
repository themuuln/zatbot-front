import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import { inter } from '@/utils/font';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Zatbot - Free Chatbot Service',
  description: 'Free Chatbot Service made for small businesses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} `}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          {children}
          {/* <Footer /> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
