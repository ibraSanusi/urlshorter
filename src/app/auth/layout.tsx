import { exo2 } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${exo2.className} flex h-screen items-center antialiased`}>
      {children}
    </div>
  );
}
