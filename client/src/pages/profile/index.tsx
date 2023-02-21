import { appUserAtom } from "@/atom";
import UploadAvatarForm from "@/components/uploadAvatarForm";
import { useAtom } from "jotai";
import React from "react";

const Profile = () => {
  return (
    <div className="flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900">
      <div className="mt-36 mb-10 flex h-auto w-screen justify-center bg-emerald-500 pb-10 dark:bg-sky-800 md:w-3/4">
        <UploadAvatarForm />
      </div>
    </div>
  );
};

export default Profile;
