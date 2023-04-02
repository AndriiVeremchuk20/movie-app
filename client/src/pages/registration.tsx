import { ResponseError } from "@/api/types/error";
import appRoutes from "@/appRoutes";
import { Loader } from "@/components/loader";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiShow, BiHide } from "react-icons/bi";
import auth from "../api/auth";

import ua from "../locales/ua/translation";
import en from "../locales/en/translation";
import Head from "next/head";

type Inputs = {
  firstName: string;
  lastName: string;
  age: Number;
  email: string;
  password: string;
  repeatPassword: string;
};

const Registration = () => {
  const [showPassword, setStowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const t = router.locale === "en" ? en : ua; 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    auth.registration,
    {
      onSuccess(data) {
        // console.log(data.msg);
        setMessage(data.msg);
        router.push("/login");
      },
      onError(e) {
        if (isAxiosError(e) && e.response) {
          const resMessage = e.response.data as ResponseError;
          setMessage(resMessage.msg);
        }
        console.log(e);
      },
    }
  );

  const onShowPasswordClick = useCallback(() => {
    setStowPassword((prev) => !prev);
  }, []);

  const onShowRepeatPasswordClick = useCallback(() => {
    setShowRepeatPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.repeatPassword) {
      mutate(data);
    } else {
      alert("Password mismatch");
    }
  };

  return (
    <>
    <Head>
      <title>{t.registration.title}</title>
    </Head>
    <div className="flex h-screen bg-[url('/img/bg-login-light.jpg')] dark:bg-[url('/img/bg-login-dark.jpg')] dark:bg-cover">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`m-auto flex h-auto w-auto flex-col rounded-xl bg-neutral-900 bg-opacity-60 p-6 shadow-2xl  dark:bg-neutral-800 dark:bg-opacity-60`}
      >
        <div className="font-mono text-3xl font-bold text-white">
          {t.registration.title}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="m-2 w-80 rounded p-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
            placeholder={t.registration.f_name}
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 18,
            })}
          />
          {errors.firstName && (
            <span className="text-sm text-red-700">Invalid first name</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="m-2 w-80 rounded p-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
            placeholder={t.registration.l_name}
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 18,
            })}
          />
          {errors.lastName && (
            <span className="text-sm text-red-700">Invalid last name</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            min="1"
            max="100"
            className="m-2 w-80 rounded p-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
            placeholder={t.registration.age}
            {...register("age", {
              required: true,
            })}
          />
          {errors.age && (
            <span className="text-sm text-red-700">Invalid last name</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            className="m-2 w-80 rounded p-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
            placeholder={t.registration.email}
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-700">Invalid email</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <input
              className="m-2 w-72 rounded px-4 py-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
              type={showPassword ? "text" : "password"}
              placeholder={t.registration.password}
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            <button
              type="button"
              onClick={onShowPasswordClick}
              className="text-3xl text-white shadow-sm"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-700">Invalid password</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <input
              className="m-2 w-72 rounded px-4 py-2 text-xl placeholder-slate-700 shadow-lg outline-none dark:bg-slate-300"
              type={showRepeatPassword ? "text" : "password"}
              placeholder={t.registration.rep_password}
              {...register("repeatPassword", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            <button
              type="button"
              onClick={onShowRepeatPasswordClick}
              className="text-3xl text-white shadow-sm"
            >
              {showRepeatPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          {errors.repeatPassword && (
            <span className="text-sm text-red-700">Invalid password</span>
          )}
        </div>

        <button
          className="my-3 flex h-auto w-full justify-center bg-blue-600 py-2 hover:bg-blue-400"
          type="submit"
        >
          {isLoading ? <Loader /> : <>{t.registration.title}</>}
        </button>

        {isError ? (
          <span className="text-sm text-red-700">{message}</span>
        ) : isSuccess ? (
          <div>{message}</div>
        ) : null}

        <div className="w-fill mx-auto">
          <Link
            href={appRoutes.login}
            className="text-xl text-blue-300 underline"
          >
            {t.registration.login}
          </Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default Registration;
