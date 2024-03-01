import { Inter } from "next/font/google";
import Navbar from "./_components/MainScreen/Navbar";
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
        <div className="w-screen h-full px-[22px] py-6 bg-sky-100 dark:bg-neutral-900 relative">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
