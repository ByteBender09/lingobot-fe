import { Inter } from "next/font/google";
import "./globals.css";
import { ModelStateProvider } from "./Context/ModelStateContext";
import { CurrentSubscribtionProvider } from "./Context/CurrentSubscribtionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LingoBot",
  description: "Smart Paraphrasing Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrentSubscribtionProvider>
          <ModelStateProvider>
            <div className="w-screen h-full bg-sky-100 dark:bg-neutral-900 relative">
              {children}
            </div>
          </ModelStateProvider>
        </CurrentSubscribtionProvider>
      </body>
    </html>
  );
}
