import React, { useEffect, useState } from "react";
import { useGeolocationQuery } from "../store/api/ipApi";
import style from './Greeting.module.scss';
import classnames from 'classnames';
import Skeleton from "./Skeleton";
import { helloApi } from "../utility/functions";

interface GreetingProps {
  name: string;
  lang: string;
}

const Greeting = ({ name, lang }: GreetingProps) => {
  const { data, error, isFetching, isLoading } = useGeolocationQuery();
  //const geoLocation = useAppSelector(state => selectGeoLocation(state));
  //console.log(geoLocation);

  const renderHTML = (rawHTML: string) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const [helloText, setHelloText] = useState("");

  let content;
  if (isLoading) {
    content = <Skeleton times={1} className={style.greeting} />;
  } else if (error) {
    content = 'A problem with Geolocation';
  } else {
    const geoLocationDetail = data && `${data?.query} ${data?.city} ${data?.regionName} ${data?.country} ${data?.zip} ${data?.lon} ${data?.lat} ${data?.timezone}`
    if (helloText) {
      content = (<div>
        {renderHTML(helloText)}
        {` ${name} you have successfully logged in!`}
        {` ${geoLocationDetail}`}
      </div>);
    } else {
      content = (<div>
        {`Hello ${name} you have successfully logged in!`}
        {` ${geoLocationDetail}`}
      </div>); 
    }
  }

  useEffect(() => {
    const getHello = async () => {
      if (data?.countryCode && lang === '') {
        const result = await helloApi(data?.countryCode);
        setHelloText(result.hello);
      } else if (lang !== '') {
        const result = await helloApi(lang);
        setHelloText(result.hello);
      }
    };
    getHello();
  }, [data, lang]);

  const classDiv = classnames(
    style.greeting,
    {
      [style.disabled]: isFetching
    }
  );
  return (
    <div className={classDiv}>
      {content}
    </div>
  )
};

export default Greeting;
