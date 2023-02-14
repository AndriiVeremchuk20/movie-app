import auth from "@/api/auth";
import { ResponseError } from "@/api/types/error";
import { appUserAtom } from "@/atom";
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
      if(isAxiosError(e)&&e.response){
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
    <div className="h-screen bg-lime-600 dark:bg-indigo-900 flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-slate-200 dark:bg-slate-400 h-auto w-96 m-auto flex 
        flex-col p-6 border-solid border-2 border-indigo-900 rounded shadow-2xl`}
      >
        <div className="text-3xl font-mono font-bold">Login</div>
        <div className="flex flex-col">
          <input
            type="email"
            className="outline-none text-xl m-2 rounded p-2 w-80 shadow-lg dark:bg-slate-300 placeholder-slate-600"
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
              className="outline-none text-xl m-2 w-72 rounded px-4 py-2 shadow-lg dark:bg-slate-300 placeholder-slate-600"
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
          className="w-full bg-lime-400 dark:bg-lime-500 my-3 py-2 hover:bg-lime-500 dark:hover:bg-lime-600"
          type="submit"
        >
          Login
        </button>

        <div>
          <Link href={"registration"} className="text-indigo-600 underline">
            Registration
          </Link>
        </div>
        <div className={`w-full h-auto text-xl bg-red-700 text-white`}>
            {errorMessage}
        </div>
      </form>
    </div>
  );
};

export default Login;
