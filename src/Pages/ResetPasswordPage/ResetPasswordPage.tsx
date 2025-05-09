import { FormEvent, useState } from "react";
import "./ResetPasswordPage.css";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Alert, Page, Input, ResetPasswordRequestBody, PasswordRegexString, AuthenticationService } from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import { PageText } from "./types";

interface Props { }

function ResetPasswordPage(props: Props) {
  const pageText: PageText = text.resetPassword;
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [searchParams] = useSearchParams()


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const data = new FormData(e.currentTarget);
    setInputsDisabled(true);

    const body: ResetPasswordRequestBody = {
      password: data.get("password") as string,
      token: token as string,
      email: email as string
    }

    AuthenticationService.resetPassword(body).then((response) => {
      if (response.status === 201) {
        navigate("/sukces/reset");
      } else {
        response.json().then((data) => {
          setSubmitError(data.error);
          setInputsDisabled(false);
        }).catch(() => {
          setSubmitError("Błąd serwera");
          setInputsDisabled(false);
        });
      }
    }).catch(() => {
      setSubmitError("Błąd połączenia z serwerem");
      setInputsDisabled(false);
    });
  };

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="reset pagewidth">
        {
          submitError &&
          <Alert
            title="Błąd"
            description="Wystąpił błąd podczas resetowania hasła:"
            message={submitError}
            buttonOneAction={() => setSubmitError(null)}
            buttonOneText="Spróbuj ponownie"
          />
        }
        <h2 className="header header__yellow">{pageText.title}</h2>
        <form onSubmit={handleSubmit} className="section--column-0">
          <Input pageText={pageText.formFields.password} id="password" name="password" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
          <Input pageText={pageText.formFields.repeatPassword} id="repeat_password" name="repeatPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
          <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
        </form>
      </div>
    </Page>
  );
}

export default ResetPasswordPage;
