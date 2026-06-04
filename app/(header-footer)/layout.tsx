import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-(--header-height) flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}