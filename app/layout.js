import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/context/AppProvider";
import SessionWrapper from "@/context/SessionWrapper";
import { AudioProvider } from "@/context/AudioProvider";
import AudioPlayer from "@/Component/AudioPlayer";
import PageWrapper from "@/Component/PageWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",
  // title: "𝗦𝘁ü𝗱𝘆𝗼 — Volume On. World Off.",
  description: "next-generation music platform that blends streaming, personalization, and creative expression.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} w-screen hide-scrollbar overflow-x-hidden h-auto  ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <AppProvider>
            <AudioProvider>
              <PageWrapper childrenn={children}></PageWrapper>
              {/* {children} */}
              <AudioPlayer />
            </AudioProvider>
          </AppProvider>

        </SessionWrapper>
        </body>
    </html>
  );
}
