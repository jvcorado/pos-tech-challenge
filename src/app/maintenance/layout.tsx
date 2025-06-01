import Container from "@/components/container";
import Header from "@/components/header";
import ProtectedRoute from "@/components/protectedRoute";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <Header />
      <Container>{children}</Container>
    </ProtectedRoute>
  );
}
