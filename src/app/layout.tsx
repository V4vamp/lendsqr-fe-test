import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "LendSqr Test",
  description: "Developed by Muhammad Mukhtar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
