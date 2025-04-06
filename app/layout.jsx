import "./globals.css";
import Providers from "@/providers";

export const metadata = {
  title: "Userology",
  description: "Userology Frontend Assignment [Crypto-Weather-Nexus]",
};

// This part remains a server component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}