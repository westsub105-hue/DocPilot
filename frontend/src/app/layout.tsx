import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocPilot",
  description: "Day 1 scaffold for an AI document processing system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

