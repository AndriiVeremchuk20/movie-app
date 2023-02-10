import ChangeThemeButton from "@/components/changeThemeButton";
import "@/styles/globals.css";
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import queryClient from "@/api/client";
import { Header } from "@/components/header";
// import auth from "@/api/requests/auth";
// import { useEffect } from "react";
// import { useAtom } from "jotai";
// import { appUserAtom } from "@/atom";

export default function App({ Component, pageProps }: AppProps) {
  
  // const [,setAppUser] = useAtom(appUserAtom);
  // const mut = useMutation(auth.authentication, {
  //   onSuccess(data){
  //     console.log(data);
  //     setAppUser(data.user)
  //   },
  //   onError(e){
  //     console.log(e);
  //   }
  // });

  // useEffect(()=>{
  //   mut.mutate();
  // },[])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ChangeThemeButton />
    </>
  );
}
