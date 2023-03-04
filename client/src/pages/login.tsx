import auth from "@/api/auth";
import { ResponseError } from "@/api/types/error";
import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import { Loader } from "@/components/loader";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiShow, BiHide } from "react-icons/bi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setStowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [, setAppUser] = useAtom(appUserAtom);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(auth.login, {
    onSuccess(data) {
      console.log(data);
      setAppUser(data.user);
      route.push("/");
    },
    onError(e) {
      if (isAxiosError(e) && e.response) {
        const error = e.response.data as ResponseError;
        setErrorMessage(error.msg);
      }
      console.log(e);
    },
  });

  const onShowPasswordClick = useCallback(() => {
    setStowPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen bg-lime-600 dark:bg-indigo-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`m-auto flex h-auto w-96 flex-col rounded 
        border-2 border-solid border-indigo-900 bg-slate-200 p-6 shadow-2xl dark:bg-slate-400`}
      >
        <div className="font-mono text-3xl font-bold">Login</div>
        <div className="flex flex-col">
          <input
            type="email"
            className="m-2 w-80 rounded p-2 text-xl placeholder-slate-600 shadow-lg outline-none dark:bg-slate-300"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">Invalid email</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <input
              className="m-2 w-72 rounded px-4 py-2 text-xl placeholder-slate-600 shadow-lg outline-none dark:bg-slate-300"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            <button
              type="button"
              onClick={onShowPasswordClick}
              className="text-3xl shadow-sm"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">Invalid password</span>
          )}
        </div>
        <button
          disabled={isLoading}
          className="my-3 w-full bg-lime-400 py-2 hover:bg-lime-500 dark:bg-lime-500 dark:hover:bg-lime-600"
          type="submit"
        >
          {isLoading ?<div className="m-auto"> <Loader /></div> : "Login"}
        </button>

        <div>
          <Link href={appRoutes.registration} className="text-indigo-600 underline">
            Registration
          </Link>
        </div>
        <div className={`h-auto w-full bg-red-700 text-xl text-white`}>
          {errorMessage}
        </div>
      </form>
    </div>
  );
};

export default Login;
