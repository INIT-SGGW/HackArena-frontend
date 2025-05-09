import { FormEvent, useState } from 'react'
import './ChangePasswordPage.css'
import { useNavigate } from 'react-router';

import { Alert, Page, Input, AuthenticationService, ChangePasswordRequestBody, PasswordRegexString } from '../../Library';

import { PageText } from './types';
import text from '../../Library/Assets/Text/main.json';

function ChangePasswordPage() {
    const pageText: PageText = text.changePassword;
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        if (data.get("password") !== data.get("repeatPassword")) {
            setSubmitError("Podane hasła nie są takie same");
            return;
        }

        const body: ChangePasswordRequestBody = {
            oldPassword: data.get("oldPassword") as string,
            newPassword: data.get("password") as string
        }

        setInputsDisabled(true);
        AuthenticationService.changePassword(body).then((response) => {
            if (response.status === 201) {
                navigate("/sukces/reset");
            } else if (response.status === 403) {
                setSubmitError("Podane stare hasło jest nieprawidłowe");
                setInputsDisabled(false);
            }
            else {
                response.json().then((data) => {
                    setSubmitError(data.error);
                    setInputsDisabled(false);
                }).catch(() => {
                    setSubmitError("Błąd serwera");
                    setInputsDisabled(false);
                });
            }
        }).catch((error) => {
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
                        description='Wystąpił błąd podczas zmiany hasła:'
                        message={submitError}
                        buttonOneAction={() => setSubmitError(null)}
                        buttonOneText="Spróbuj ponownie"
                    />
                }
                <h2 className="header header__yellow">{pageText.title}</h2>
                <form onSubmit={handleSubmit} className="section--column-0">
                    <Input pageText={pageText.formFields.oldPassword} id="oldPassword" name="oldPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
                    <Input pageText={pageText.formFields.password} id="password" name="password" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
                    <Input pageText={pageText.formFields.repeatPassword} id="repeat_password" name="repeatPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
                    <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
                </form>
            </div>
        </Page>
    );
}

export default ChangePasswordPage