import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LingoBot",
  description: "Smart Paraphrasing Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-full bg-sky-100 dark:bg-neutral-900 relative">
          {children}
        </div>
      </body>
    </html>
  );
}
