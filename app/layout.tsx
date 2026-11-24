import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: "./fonts/montserrat-latin.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
});

const roboto = localFont({
  src: "./fonts/roboto-latin.woff2",
  weight: "100 900",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "TiffinSutra | Daily Home-Style Tiffin Service",
  description:
    "Fresh, healthy and delicious home-style meals delivered to your doorstep every day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}