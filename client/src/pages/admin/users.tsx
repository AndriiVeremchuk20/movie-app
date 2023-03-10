import admin from "@/api/admin";
import UserAvatar from "@/components/userAvatar";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsersMutation = useMutation(admin.users.getUsers, {
    onSuccess(data) {
      setUsers(data);
    },
    onError() {},
  });

  const deleteUserMutation = useMutation(admin.users.deleteUser, {
    onSuccess(data){
      console.log(data);
      setUsers(prev => prev.filter(user=>user.id!==data.id));
    }
  });

  const premiumMutation = useMutation(admin.users.pickPremium, {
    onSuccess(data){
      console.log(data);
      setUsers(prev=>prev.map(item=>{
        if(item.id === data.id){
          return {...item, isPremium: false}
        }
        return item
      }))
    }
  });

  const onDeleteUserClick = useCallback((id: string)=>{
    deleteUserMutation.mutate(id);
  },[]);

  const onPremiumClick = useCallback((id: string)=>{
    premiumMutation.mutate(id);
  },[]);

  useEffect(() => {
    getUsersMutation.mutate();
  }, []);

  return (
    <div className="flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900">
      <div className="mt-36 mb-10 flex h-auto w-screen justify-center bg-emerald-500 pb-10 dark:bg-sky-800 md:w-3/4">
        <div className="m-3 w-full">
          <table className="w-full rounded-md border-2 border-black">
            <thead className="bg-indigo-600 text-xl">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Last</th>
                <th>Age</th>
                <th>Email</th>
                <th>Premium</th>
                <th>Delete user</th>
              </tr>
            </thead>
            <tbody className=" bg-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-black p-4">
                  <td className="h-24 w-24 p-3">
                    <UserAvatar avatarPath={user.avatarPath} />
                  </td>
                  <td align="center">{user.firstName}</td>
                  <td align="center">{user.lastName}</td>
                  <td align="center">{user.age}</td>
                  <td align="center"> {user.email}</td>
                  <td align="center">
                    
                    <button
                      disabled={!user.isPremium}
                      onClick={()=>{onPremiumClick(user.id)}}
                      className={` ${
                        user.isPremium ? "bg-yellow-500" : "bg-gray-300"
                      } w-fit p-2 hover:shadow-sm hover:shadow-yellow-800`}
                    >
                      Premium
                    </button>
                  </td>
                  <td align="center">
                    <button className="bg-red-500 p-2 hover:bg-red-600" onClick={()=>{onDeleteUserClick(user.id)}}> Delete user </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default Users;
