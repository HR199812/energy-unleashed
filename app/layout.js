import { Karantina, Poppins } from 'next/font/google';
import "./globals.css";

const karantina = Karantina({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${karantina.className} ${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
