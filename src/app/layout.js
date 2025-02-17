import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import { I18nProvider } from "./provider";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Backoffice",
  description: "Backoffice Dugnadstid.no",
  openGraph: {
    title: "Backoffice",
    description: "Backoffice Dugnadstid.no",
    images: [
      {
        url: "https://admin.dugnadstid.no/images/DT_LOGO_HJERTE-High-Quality.jpg",
        width: 1200,
        height: 630,
        alt: "Backoffice Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backoffice",
    description: "Backoffice Dugnadstid.no",
    images: ["https://admin.dugnadstid.no/images/DT_LOGO_HJERTE-High-Quality.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/favicon.ico' />
        {/* Open Graph Meta Tags */}
        <meta property='og:title' content='Backoffice' />
        <meta property='og:description' content='Backoffice Dugnadstid.no' />
        <meta
          property='og:image'
          content='https://admin.dugnadstid.no/images/DT_LOGO_HJERTE-High-Quality.jpg'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:type' content='website' />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Backoffice' />
        <meta name='twitter:description' content='Backoffice Dugnadstid.no' />
        <meta
          name='twitter:image'
          content='https://admin.dugnadstid.no/images/DT_LOGO_HJERTE-High-Quality.jpg'
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <main>{children}</main>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
        </I18nProvider>
      </body>
    </html>
  );
}
