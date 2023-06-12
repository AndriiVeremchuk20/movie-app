import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import avatarApi from "@/api/avatar";
import UserAvatar from "./userAvatar";

const UploadAvatarForm = () => {
  const [user, setUser] = useAtom(appUserAtom);

  const avatarMutation = useMutation(avatarApi.edit, {
    onSuccess(data) {
      console.log(data);
      if (user) {
        setUser({ ...user, avatarPath: data.avatarPath });
      }
    },
  });

  const removeAvatarMutation = useMutation(avatarApi.remove, {
    onSuccess() {
      if (user) {
        setUser({ ...user, avatarPath: null });
      }
    },
  });

  const onFileChange = useCallback((e: any) => {
    const avatarFile = e.target.files[0];
    const body = new FormData();
    body.append("avatar", avatarFile);

    avatarMutation.mutate(body);
  }, []);

  const onRemoveAvatarClick = useCallback(() => {
    removeAvatarMutation.mutate();
  }, []);

  if (user)
    return (
      <div className="flex w-fit flex-col">
        <div className=" h-64 w-fit">
          <UserAvatar avatarPath={user.avatarPath} />
        </div>
        <div className="mt-4 flex flex-col-reverse">
          <div className="relative m-1 w-fit">
            <input
              type="file"
              className="absolute inset-0 z-50 opacity-0"
              onChange={onFileChange}
            />
            <button className="ml-16 rounded bg-blue-500 px-9 py-2 text-white">
              Change avatar
            </button>
          </div>
		{
			user.avatarPath?
          <button
            onClick={onRemoveAvatarClick}
            className="m-1 ml-16 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
		> Remove avatar </button> : null
		}
        </div>
      </div>
    );

  return null;
};

export default React.memo(UploadAvatarForm);
