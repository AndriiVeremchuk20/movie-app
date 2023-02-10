import { QueryClientProvider } from "@tanstack/react-query";
import { Html, Head, Main, NextScript } from "next/document";
import queryClient from "@/api/client";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
