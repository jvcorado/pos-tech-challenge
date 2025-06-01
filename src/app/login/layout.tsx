import Container from "@/components/container";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}
