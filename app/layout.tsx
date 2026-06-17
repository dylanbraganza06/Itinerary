import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goa 2026 — The Boys Trip",
  description: "7 friends. 4 days. One unforgettable trip.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Goa 2026" },
};

export const viewport: Viewport = {
  themeColor: "#050a0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
  lang="en"
  className="dark"
  data-scroll-behavior="smooth"
>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "rgba(5,10,15,0.9)",
                color: "#f0f4f8",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
