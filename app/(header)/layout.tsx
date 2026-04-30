import { Toaster } from "react-hot-toast";
import Header from "@/components/shared/Header";

export default function HeaderOnlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-20 flex-1">
        {children}
      </main>
      <Toaster position="top-center" />
    </>
  );
}