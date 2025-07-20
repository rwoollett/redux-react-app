import React, { FormEvent } from 'react';
import { useState } from 'react';
import { useSignUpMutation } from '../store/api/usersApi';
import { StatusErrors } from '../types/statusErrors';
import { useNavigate } from 'react-router-dom';
import StatusAlert from './StatusAlert';
import style from './SignUp.module.scss';
import Banner from './Banner';


const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const [signUp, results] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp({ email, password }).unwrap();
      setEmail("");
      setPassword("");

      navigate("/");

    } catch (error) {
      const statusErrors = error as Partial<StatusErrors>;
      setErrors(<StatusAlert statusErrors={statusErrors} />);
    }
  };

  return (
    <div>
      <Banner title="Hello World with Language" desc="Register your details" />
      <section className='section'>
        <div className="container is-fluid">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Email Address</label>
              <div className="control">
                <input className={`input`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className={`input`}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>

            {results.isError && errors}
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-primary">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;