import AppToaster from "@/components/shared/AppToaster";

export default function FormPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <AppToaster />
    </>
  );
}
