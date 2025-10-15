"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { useEffect } from 'react';

function Provider({ children }: any) {
  const { user } = useUser();
  const createUser = useMutation(api.users.CreateNewUser);

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
    <div>
      {children}
    </div>
  );
}

export default Provider