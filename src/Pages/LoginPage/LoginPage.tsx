import { FormEvent, useEffect, useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert, AuthenticationService, Page, Input, LoginRequestBody, ErrorBodyResponse, LoginBodyResponse, EmailRegexString,
  PasswordRegexString,
  useAuth,
  SocialMedia
} from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import { PageText } from "./types";

function LoginPage() {
  const pageText: PageText = text.login;

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="login__disabled pagewidth">
        <div>
          <h2 style={{ margin: "auto" }} className="header header__yellow">Logowanie</h2>
          <p style={{ marginTop: "1rem" }} className="login__text">Opcja chwilowo niedostępna. Przepraszamy za utrudnienia</p>
        </div>
        <SocialMedia />
      </div>
    </Page>
  )

  // const pageText: PageText = text.login;
  // const [error, setError] = useState<string | null>(null);
  // const [showErrors, setShowErrors] = useState<boolean>(false);
  // const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  // const navigate = useNavigate();
  // const { isAuthenticated, login, logout } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/konto");
  //   }
  // });

  // const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const data = new FormData(form);
  //   const dataObject = Object.fromEntries(data);

  //   const body: LoginRequestBody = {
  //     email: dataObject.email as string,
  //     password: dataObject.password as string
  //   };

  //   setInputsDisabled(true);

  //   AuthenticationService.login(body)
  //     .then((response) => {
  //       if (response.status === 202) {
  //         response.json().then((data: LoginBodyResponse) => {
  //           try {
  //             login(data.email, data.teamName);
  //           } catch (error) {
  //             setError("Wystąpił błąd podczas logowania");
  //             logout()
  //             setInputsDisabled(false);
  //           }
  //           navigate("/konto");
  //         });
  //       } else {
  //         response.json().then((data: ErrorBodyResponse) => {
  //           setError(data.error);
  //           setInputsDisabled(false);
  //         }).catch(() => {
  //           setError("Błąd serwera");
  //           setInputsDisabled(false);
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setError("Błąd połączenia z serwerem");
  //       setInputsDisabled(false);
  //     });
  // };

  // return (
  //   <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
  //     {error &&
  //       <Alert
  //         title="Błąd"
  //         description="Wystąpił błąd podczas logowania:"
  //         message={error}
  //         buttonOneText="Spróbuj ponownie"
  //         buttonOneAction={() => { setError(""); }}
  //       />
  //     }
  //     <div className="login pagewidth">
  //       <h2 className="header header__yellow">{pageText.title}</h2>
  //       <form className="section--column-0" onSubmit={handleSubmit}>
  //         <Input
  //           pageText={pageText.form.email}
  //           id="email"
  //           name="email"
  //           type="email"
  //           showError={showErrors}
  //           maxLength={70}
  //           inputDisabled={inputsDisabled}
  //           pattern={EmailRegexString}
  //         />
  //         <Input
  //           pageText={pageText.form.password}
  //           id="password"
  //           name="password"
  //           type="password"
  //           showError={showErrors}
  //           inputDisabled={inputsDisabled}
  //           minLength={8}
  //           maxLength={70}
  //           pattern={PasswordRegexString}
  //         />
  //         <input
  //           type="submit"
  //           className="input__element input__button"
  //           onClick={() => setShowErrors(true)}
  //           disabled={inputsDisabled}
  //           value={inputsDisabled ? pageText.button.disabled : pageText.button.active}
  //         />
  //         <Link className="login__forgot" to="/password/forgot">Zapomniałeś hasła?</Link>
  //       </form>
  //     </div>
  //   </Page>
  // )
}


export default LoginPage;
