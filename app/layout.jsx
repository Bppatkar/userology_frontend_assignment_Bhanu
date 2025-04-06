import "./globals.css";
import Providers from "@/providers";

export const metadata = {
  title: "Userology",
  description: "Userology Frontend Assignment [Crypto-Weather-Nexus]",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#0f172a] text-white font-sans min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}