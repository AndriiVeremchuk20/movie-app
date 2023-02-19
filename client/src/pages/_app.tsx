import ChangeThemeButton from "@/components/changeThemeButton";
import "@/styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Header } from "@/components/header";
import { useAtom } from "jotai";
import { appUserAtom } from "@/atom";
import auth from "@/api/auth";
import { useEffect } from "react";
import Footer from "@/components/footer";
import { UpButton } from "@/components/upButton";

const AppWrapper = (props: any) => {
  return <QueryClientProvider client={new QueryClient()} {...props} />;
};

const AppInner = ({ Component, pageProps }: AppProps) => {
  const [, setAppUser] = useAtom(appUserAtom);
  const authMutate = useMutation(auth.authentication, {
    onSuccess(data) {
      console.log(data);
      setAppUser(data.user);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    authMutate.mutate();
  }, []);

  return <Component {...pageProps} />;
};

export default function App(props: AppProps) {
  return (
    <>
      <AppWrapper>
      <Header />
        <AppInner {...props} />
        <Footer/>
      </AppWrapper>
      <ChangeThemeButton />
      <UpButton/>
    </>
  );
}
