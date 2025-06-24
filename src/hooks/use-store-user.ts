import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/_generated/api";

/**
 * A hook that stores the user in the `users` table.
 * It uses the `useConvexAuth` hook to get the current authentication state
 * and the `useUser` hook from Clerk to get the user information.
 *
 * @returns {Object} An object containing `isLoading` and `isAuthenticated` properties.
 */
export function useStoreUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  // When this state is set we know the server has stored the user.
  const [userId, setUserId] = useState<string | null>(null);

  // Use the `useMutation` hook to create a mutation function that calls the `store` mutation to add user to the `users` table.
  const storeUser = useMutation(api.users.store);

  // Call the `storeUser` mutation function to store the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in doesn't do anything
    if (!isAuthenticated) {
      return;
    }

    // Store the user in the database.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();

    // Cleanup function to reset the userId state when the component unmounts
    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with a different identity
  }, [isAuthenticated, storeUser, user?.id]);
  // If at any point the authentication state changes, or the mutation function changes,or the user identity changes then the effect will rerun.
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}