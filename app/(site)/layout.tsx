import { AuthContext, Footer, Header, ToastProvider } from "../components";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-bodyFont min-h-screen flex flex-col">
      <AuthContext>
        <ToastProvider />
        <Header />
        {children}
        <Footer />
      </AuthContext>
    </main>
  );
}
