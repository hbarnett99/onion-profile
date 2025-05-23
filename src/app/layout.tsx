import "./globals.css";

export const metadata = {
  title: "Onion Creative Studio Clone",
  description: "A beautiful creative studio website",
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
