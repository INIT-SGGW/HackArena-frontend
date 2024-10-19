import "./ForgotPassword.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import { Alert, AuthenticationService, Page, Input, ForgotPasswordRequestBody, EmailRegexString }
    from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import { PageText } from "./types";

function ForgotPasswordPage() {
    const pageText: PageText = text.forgotPassword;
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const body: ForgotPasswordRequestBody = {
            email: data.get("email") as string
        }

        setInputsDisabled(true);
        AuthenticationService.forgotPassword(body).then((response) => {
            if (response.status === 201) {
                navigate("/sukces/forgot");
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
                    <Input
                        pageText={pageText.formFields.email}
                        id="email"
                        name="email"
                        type="email"
                        showError={showErrors}
                        maxLength={70}
                        inputDisabled={inputsDisabled}
                        pattern={EmailRegexString}
                    />
                    <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
                </form>
            </div>
        </Page>
    );
}

export default ForgotPasswordPage;
