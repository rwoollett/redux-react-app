import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Banner from '../components/Banner';
import Greeting from '../components/Greeting';
import { setContents } from '../store/actions/data';
import { ipApi } from '../store/api/ipApi';
import { useAppDispatch } from '../store/reducers/store';
import { sayFarewell } from '../utility/functions';
import { useSignInMutation, useSignOutMutation } from '../store/api/usersApi';
import { StatusErrors } from '../types/statusErrors';
import StatusAlert from '../components/StatusAlert';

const HomePage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLangCode] = useState("");
  const [farewell, setFarewell] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const [signIn, results] = useSignInMutation();
  const [signOut, resultsSO] = useSignOutMutation();


  const dispatch = useAppDispatch();

  const onHandleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage: string[] = [];
    if (name === '') {
      errorMessage.push('Please enter name!');
    }
    if (password === '') {
      errorMessage.push('Please enter a password!');
    }

    try {
      console.log(name, password);
      await signIn({ email:name, password }).unwrap();
      setName("");
      setPassword("");
    } catch (error) {
      //errorMessage.push(JSON.stringify(error));
      const statusErrors = error as Partial<StatusErrors>;
      setErrors(<StatusAlert statusErrors={statusErrors} />);

    }

    setErrorMessage(errorMessage);
    if (errorMessage.length === 0) {
      dispatch(ipApi.util.invalidateTags(['CurrentUser']));
      dispatch(setContents([name]));
      setIsValidForm(true);
  
    }
  };

  const onHandleLogout = async () => {
    if (isValidForm) {
      setFarewell(sayFarewell(name));
      setIsValidForm(false);
      await signOut().unwrap();

    }
    setName('');
    setPassword('');
    setLangCode('');
    setErrorMessage([]);

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFarewell('')
    }, 5000)
    return () => clearInterval(interval)
  }, [isValidForm])

  return (
    <div>
      <Banner title="Hello World with Language" desc="Show language of req IP" />
      <section className='section'>
        <div className="container is-fluid">
          <form onSubmit={onHandleLogin}>
            <ul>
              {errorMessage.length > 0 && errorMessage.map((err, i) => {
                return (<li key={i}>{err}</li>);
              })}
            </ul>
            {results.isError && errors}
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input value={name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                  className={`input ${name === '' && errorMessage.length && 'is-danger'}`} type="text" placeholder="e.g Alex Smith" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  className={`input ${password === '' && errorMessage.length && 'is-danger'}`} type="password" placeholder="password" />
              </div>
            </div>

            <div className="field">
              <label className="label">Language Code</label>
              <div className="control">
                <input value={lang}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setLangCode(event.target.value)}
                  className={`input`} type="text" placeholder="language code" />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-primary">Login</button>
              </div>
              <div className="control">
                <button onClick={onHandleLogout} type="button" className="button is-primary is-light">Logout</button>
              </div>
            </div>

            <div className='block'>
              {isValidForm && <Greeting name={name} lang={lang} />}
              {farewell}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage

