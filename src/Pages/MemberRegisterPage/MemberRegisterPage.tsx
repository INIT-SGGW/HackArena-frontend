import React from 'react'
import './MemberRegisterPage.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
    Alert, Page, Input, eventStartDate, youngestParticipantAge, replacePlaceholders, Select, DietPreference,
    Occupation, RegisterTeamMemberRequestBody, AuthenticationService, ErrorBodyResponse, PasswordRegexString, TextRegexString
} from '../../Library'

import text from "../../Library/Assets/Text/main.json"
import { PageText } from './types'

function MemberRegisterPage() {
    const pageText: PageText = text.memberRegister

    const { teamName } = useParams<{ teamName: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [showErrors, setShowErrors] = React.useState<boolean>(false)
    const [inputsDisabled, setInputsDisabled] = React.useState<boolean>(false)
    const [agreementError, setAgreementError] = React.useState<boolean>(false)
    const [submitError, setSubmitError] = React.useState<string>("")
    const [serverError, setServerError] = React.useState<string>("")
    const [schoolInputVisible, setSchoolInputVisible] = React.useState<boolean>(false)


    const minDate = new Date(eventStartDate.getTime() - 1000 * 60 * 60 * 24 * 365 * youngestParticipantAge)

    const handleAgreementInvalid = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setAgreementError(true);
    }

    const handleChangeAgreement = (e: React.FormEvent<HTMLInputElement>): void => {
        if (showErrors && !e.currentTarget.checkValidity()) {
            setAgreementError(true);
        } else {
            setAgreementError(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setSubmitError("");

        const data = Object.fromEntries(new FormData(e.currentTarget));
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        if (!token || !email) {
            setSubmitError("Brak wymaganych parametrów w adresie URL");
            return;
        }

        if (data.password !== data.repeatPassword) {
            setSubmitError("Podane hasła nie są takie same")
            return;
        }

        const body: RegisterTeamMemberRequestBody = {
            firstName: data.firstName as string,
            lastName: data.lastName as string,
            password: data.password as string,
            dateOfBirth: new Date(data.dateOfBirth as string).toISOString() as string,
            occupation: data.occupation as Occupation,
            dietPreference: data.dietPreference as DietPreference,
            agreement: data.agreement === "on",
            verificationToken: token,
            email: email
        }

        setInputsDisabled(true);

        AuthenticationService.registerTeamMember(body).then((response) => {
            if (response.status === 201) {
                navigate("/sukces/rejestracja/uczestnika")
            } else {
                response.json().then((data: ErrorBodyResponse) => {
                    setServerError(data.error)
                    setInputsDisabled(false)
                }).catch(() => {
                    setServerError("Błąd serwera")
                    setInputsDisabled(false)
                })
            }
        }).catch((error) => {
            setServerError("Błąd połączenia z serwerem")
            setInputsDisabled(false)
        })
    }

    const handleChange = (): void => {
        // get value of select of id occupation
        const occupation = (document.getElementById("occupation") as HTMLSelectElement).value
        if (occupation === "undergraduate") {
            setSchoolInputVisible(true)
        } else {
            setSchoolInputVisible(false)
        }
    }

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingTop noIndex>
            {serverError &&
                <Alert
                    title="Błąd"
                    description='Wystąpił błąd podczas rejestracji:'
                    message={serverError}
                    buttonOneText="Spróbuj ponownie"
                    buttonOneAction={() => { setServerError(""); }}
                />
            }
            <div className='memberRegister pagewidth'>
                <div className='section--column-1 register--heading'>
                    <h2 className='header header__yellow'>{pageText.title}</h2>
                    <h6>{replacePlaceholders(pageText.description, teamName || "")}</h6>
                </div>
                <form className='section--column-0' onChange={handleChange} onSubmit={handleSubmit}>
                    <div className="section--row-1">
                        <Input pageText={pageText.form.firstName} id='first_name' name='firstName' showError={showErrors} minLength={1} maxLength={40} inputDisabled={inputsDisabled} pattern={TextRegexString} />
                        <Input pageText={pageText.form.lastName} id='last_name' name='lastName' showError={showErrors} minLength={1} maxLength={40} inputDisabled={inputsDisabled} pattern={TextRegexString} />
                    </div>
                    <div className="section--row-1">
                        <Input pageText={pageText.form.password} id="password" name="password" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
                        <Input pageText={pageText.form.password} id="repeat_password" name="repeatPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern={PasswordRegexString} />
                    </div>
                    <Input pageText={pageText.form.dateOfBirth} id='date_of_birth' name='dateOfBirth' type="date" maxNumber={minDate.toISOString().slice(0, 10)} showError={showErrors} inputDisabled={inputsDisabled} />
                    <div className="section--row-1" style={{ alignItems: "flex-start" }}>
                        <div className="section--column-0" >
                            <label htmlFor="occupation">{pageText.form.occupation.label}</label>
                            <Select name='occupation' id='occupation' options={pageText.form.occupation.occupationOptions} inputDisabled={inputsDisabled} />
                        </div>
                        {
                            schoolInputVisible && (
                                <div className="section--column-0">
                                    <Input pageText={pageText.form.school} id="school" name="school" showError={showErrors} minLength={2} maxLength={200} inputDisabled={inputsDisabled} pattern={TextRegexString} />
                                </div>
                            )
                        }
                    </div>
                    <div className="section--row-1" style={{ marginTop: `${schoolInputVisible ? "0px" : "0.7rem"}` }}>
                        <div className="section--column-0">
                            <label htmlFor="diet_preference">{pageText.form.dietPreference.label}</label>
                            <Select name='dietPreference' id='diet_preference' options={pageText.form.dietPreference.dietPreferenceOptions} inputDisabled={inputsDisabled} />
                        </div>
                    </div>
                    <div className="form__checkbox--wrapper">
                        <input type="checkbox" name="agreement" id="agreement" onChange={handleChangeAgreement} onInvalid={handleAgreementInvalid} required disabled={inputsDisabled} className={agreementError ? 'input__checkbox--invalid' : ""} />
                        <label htmlFor='agreement' style={inputsDisabled ? { cursor: "default" } : { cursor: "pointer" }}>{pageText.form.agreement.label}</label>
                    </div>
                    <input type='submit' className='input__element input__button' onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
                    <span className={`input__span${submitError ? " input__span--visible" : ""}`}>{submitError}</span>

                </form>
            </div>
        </Page>
    )
}

export default MemberRegisterPage