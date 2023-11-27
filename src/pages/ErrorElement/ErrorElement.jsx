import { useRouteError } from 'react-router-dom';
import './error-element.css'
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i style={{fontWeight:'bold'}}>{error.status || error.message}</i>
      </p>
    </div>
  );
}