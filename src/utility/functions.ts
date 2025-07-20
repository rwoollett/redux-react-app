
/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
  return 'Welcome ' + userName + '!'
}

export const sayFarewell = (userName: string): string => {
  return 'Have a great day ' + userName + '!'
}

interface HelloLanguage {
  code: string;
  hello: string;
}

export const helloApi = async (term: string): Promise<HelloLanguage> => {
  const response = await fetch(`http://hellosalut.stefanbohacek.dev/?lang=${term}`, {
    method: "GET"
  });
  const data = await response.json();
  return data;
};


export function baseAuthUrl() {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.REACT_APP_AUTH_URL}`;
  } else {
    return `${process.env.REACT_APP_AUTH_URL}`;
  }
}



