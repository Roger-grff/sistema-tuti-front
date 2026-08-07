export const metadata = {
  title: "Sistema Supermercado",
  description: "Aplicación del supermercado",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}