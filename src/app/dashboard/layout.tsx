import Container from "@/components/container";
import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Container className="">{children}</Container>
    </div>
  );
}
