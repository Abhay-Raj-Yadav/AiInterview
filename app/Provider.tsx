"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react';

function Provider({ children }: any) {
  const { user } = useUser();
  const createUser = useMutation(api.users.CreateNewUser);
  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    if (user) {
      createUser({
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? "",
        imageUrl: user.imageUrl ?? "",
      });
    }

    // Only run when user changes
  }, [user]);

  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
    <div>
      {children}
    </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetailContext=()=>{
  return React.useContext(UserDetailContext);
}