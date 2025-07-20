import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOutMutation } from '../store/api/usersApi';

const SignOut = (): JSX.Element => {
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      signOut().unwrap();
      navigate("/");

    } catch (error) {
      console.log(error);
    }

  }, [signOut, navigate]);

  return <div>Signing you out...</div>;
};

export default SignOut;