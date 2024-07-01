import { Inter } from "next/font/google";
import "./globals.css";
import "../public/styles.css"
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Battary Swap Inventory',
  description: 'Battary Swap Inventory & Sales Managment',
  applicationName: 'Swap Inventory',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: 'Swap Inventory',
  formatDetection: {
    telephone: 'no'
  },
  mobileWebAppCapable: 'yes',
  msapplication: {
    config: '/img/icons/favs/site.webmanifest',
    tileColor: '#2B5797',
    tapHighlight: 'no',
  },
  icons: {
    icon: [
      { url: '/img/icons/favs/favicon.ico', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/touch-icon-iphone.png' },
      { url: '/icons/touch-icon-ipad.png', sizes: '152x152' },
      { url: '/icons/touch-icon-iphone-retina.png', sizes: '180x180' },
      { url: '/icons/touch-icon-ipad-retina.png', sizes: '167x167' },
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
    ],
  },
  // twitter: {
  //   card: 'summary',
  //   url: 'https://yourdomain.com',
  //   title: 'PWA App',
  //   description: 'Best PWA App in the world',
  //   image: 'https://yourdomain.com/icons/android-chrome-192x192.png',
  //   creator: '@DavidWShadow',
  // },
  // openGraph: {
  //   type: 'website',
  //   url: 'https://yourdomain.com',
  //   title: 'PWA App',
  //   description: 'Best PWA App in the world',
  //   siteName: 'PWA App',
  //   image: 'https://yourdomain.com/icons/apple-touch-icon.png',
  // },
};

export const viewport = {
  themeColor: '#000000',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
