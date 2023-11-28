import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React - The Road To Enterprise",
  description: "Chapter Next.js",
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
