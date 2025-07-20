import { useCurrentUserQuery } from "../store/api/usersApi";

function useSignedInAuthorize(): { 
  isLoggedIn: boolean; 
  userId: string | undefined;
  email: string | undefined
 } {
  const { data } = useCurrentUserQuery();
  return {
    isLoggedIn: data?.currentUser ? true : false,
    userId: data?.currentUser?.id,
    email: data?.currentUser?.email
  };

}

export default useSignedInAuthorize;