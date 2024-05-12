import "./globals.css";

export const metadata = {
  title: "Mark Thompson",
  description:
    "Personal website of Mark Thompson. 4th-best Mark Thompson, 2016 awards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
