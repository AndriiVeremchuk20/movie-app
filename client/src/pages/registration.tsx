import { ResponseError } from "@/api/types/error";
import { Loader } from "@/components/loader";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiShow, BiHide } from "react-icons/bi";
import auth from "../api/auth";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    auth.registration,
    {
      onSuccess(data) {
        console.log(data.msg);
        setMessage(data.msg);
        router.push("/login");
      },
      onError(e) {
        if(isAxiosError(e)&&e.response){
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
    <div className="h-screen bg-lime-600 dark:bg-indigo-900 flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-slate-200 dark:bg-slate-400 h-auto w-auto m-auto 
        flex flex-col p-6 border-solid border-2 border-indigo-900 rounded 
        shadow-2xl`}
      >
        <div className="text-3xl font-mono font-bold ">Registration</div>
        <div className="flex flex-col">
          <input
            type="text"
            className="outline-none text-xl m-2 rounded p-2 w-80 shadow-lg dark:bg-slate-300 placeholder-slate-700"
            placeholder="First name"
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
            className="outline-none text-xl m-2 rounded p-2 w-80 shadow-lg dark:bg-slate-300 placeholder-slate-700"
            placeholder="Last name"
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
            className="outline-none text-xl m-2 rounded p-2 w-80 shadow-lg dark:bg-slate-300 placeholder-slate-700"
            placeholder="Age"
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
            className="outline-none text-xl m-2 rounded p-2 w-80 shadow-lg dark:bg-slate-300 placeholder-slate-700"
            placeholder="Email"
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
              className="outline-none text-xl m-2 w-72 rounded px-4 py-2 shadow-lg dark:bg-slate-300 placeholder-slate-700"
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
            <span className="text-sm text-red-700">Invalid password</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <input
              className="outline-none text-xl m-2 w-72 rounded px-4 py-2 shadow-lg dark:bg-slate-300 placeholder-slate-700"
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...register("repeatPassword", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            <button
              type="button"
              onClick={onShowRepeatPasswordClick}
              className="text-3xl shadow-sm"
            >
              {showRepeatPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          {errors.repeatPassword && (
            <span className="text-sm text-red-700">Invalid password</span>
          )}
        </div>

        <button
          className="w-full h-auto flex justify-center bg-lime-400 my-3 py-2 hover:bg-lime-500 dark:bg-lime-500 dark:hover:bg-lime-700"
          type="submit"
        >
          {isLoading ? <Loader/> : "Registration"}
        </button>

        {isError ? (
          <span className="text-sm text-red-700">{message}</span>
        ) : isSuccess ? (
          <div>{message}</div>
        ) : null}

        <div>
          <Link href={"login"} className="text-indigo-600 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
