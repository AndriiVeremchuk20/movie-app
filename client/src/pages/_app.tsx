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
import Token from "@/utils/token";
import { appWithTranslation, AppWithTranslation } from "next-i18next";

const AppWrapper = (props: any) => {
  return <QueryClientProvider client={new QueryClient()} {...props} />;
};

const AppInner = ({ Component, pageProps }: AppProps) => {
  const [, setAppUser] = useAtom(appUserAtom);
  const authMutate = useMutation(auth.authentication, {
    onSuccess(data) {
      setAppUser(data.user);
      //console.log(data.user);
    },
    onError(e) {
      console.log(e);
      Token.clear();
    },
  });

  useEffect(() => {
    if (Token.get()) {
      authMutate.mutate();
    }
  }, []);

  return <Component {...pageProps} />;
};

function App(props: AppProps) {
  return (
    <>
      <AppWrapper>
        <Header />
      <AppInner {...props} />
        <Footer />
      </AppWrapper>
      <ChangeThemeButton />
      <UpButton />
    </>
  );
}

export default appWithTranslation(App);
