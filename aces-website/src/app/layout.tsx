import type { Metadata } from "next";
import { Geist, Nunito_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aces-Uniben",
  description: "This a student information hub built for the department of Computer Engineering, Uniben. It was developed by the Student body, Association of Computer Engineering Students Software Club",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
