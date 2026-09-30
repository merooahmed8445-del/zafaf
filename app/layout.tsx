import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zafaf — دعوات زفاف رقمية فاخرة",
  description: "أنشئ دعوة زفاف رقمية فاخرة في دقائق. تصميمات ملكية، موسيقى، عد تنازلي، وتأكيد حضور تفاعلي.",
  keywords: ["دعوة زفاف", "دعوة رقمية", "wedding invitation", "zafaf"],
  authors: [{ name: "Zafaf" }],
  openGraph: {
    title: "Zafaf — دعوات زفاف رقمية فاخرة",
    description: "أنشئ دعوة زفاف رقمية فاخرة في دقائق.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}