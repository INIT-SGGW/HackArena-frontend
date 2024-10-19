import { useEffect, useState } from 'react';
import './TestTaskPage.css'
import { useNavigate } from 'react-router-dom';

import { Button, EnglishAlphabetRegexString, Input, Page, GetTestTaskResponseBody, SendGuessRequestBody, useAuth, Alert, SendGuessResponseBody, GetTestTaskFinishedResponseBody } from '../../Library'
import ReactMarkdown from 'react-markdown';

import text from "../../Library/Assets/Text/main.json";
import { PageText } from './types';
import QualificationService from '../../Library/Services/QualificationService';

function TestTaskPage() {
    const pageText: PageText = text.testTask;
    const navigate = useNavigate();

    const [showError, setShowError] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
    const [customError, setCustomError] = useState<string | null>(null);
    const [taskData, setTaskData] = useState<GetTestTaskResponseBody | null>(null);
    const [alertMessage, setAlertMessage] = useState<{ message: string, description: string } | null>(null);
    const [taskMD, setTaskMD] = useState<string | null>(null);
    const [completed, setCompleted] = useState<boolean | null>(null);
    const { teamName } = useAuth();

    useEffect(() => {
        fetch('Assets/task.md')
            .then((response) => response.text())
            .then((text) => {
                setTaskMD(text)
            });
    }, []);

    useEffect(() => {
        QualificationService.getTestTask(teamName).then((response) => {
            if (response.ok) {
                response.json().then((data: GetTestTaskResponseBody) => {
                    if (response.status === 200) {
                        setTaskData(data);
                        setInputsDisabled(data.chances === 0);
                    } else if (response.status === 202) {
                        const { chances, completed } = data as GetTestTaskFinishedResponseBody;
                        setTaskData({ chances });
                        setCompleted(completed);
                    }
                }).catch((error) => {
                    setAlertMessage({ message: error.message, description: "Błąd pobierania danych z serwera" });
                })

            }
            else {
                response.json().then((data) => {
                    setAlertMessage({ message: data.message, description: "Błąd serwera" });
                })
            }
        }).catch((error) => {
            setAlertMessage({ message: error.message, description: "Błąd połączenia z serwerem" });
        })
    }, [])

    const hundleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputsDisabled(true);
        setCustomError(null);
        setShowError(false);

        const data = new FormData(e.currentTarget);
        const body: SendGuessRequestBody = {
            teamName: teamName,
            guess: data.get("answer") as string
        }

        QualificationService.sendGuess(body).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const { message, chances } = data as SendGuessResponseBody;
                    if (chances === 0) {
                        navigate("/zadanie/niepoprawne");
                    }
                    setCustomError(`${message}`);
                    setTaskData({ chances });
                }).catch((error) => {
                    setAlertMessage({ message: error.message, description: "Błąd pobierania danych z serwera" });
                })
            } else if (response.status === 204) {
                console.log("204");
                navigate("/zadanie/poprawne");
            } else {
                response.json().then((data) => {
                    setAlertMessage({ message: data.message, description: "Błąd serwera" });
                })
            }
        }).catch((error) => {
            setAlertMessage({ message: error.message, description: "Błąd połączenia z serwerem" });
        })

        setInputsDisabled(false);
    }

    const handleDownloadTask = () => {
        QualificationService.downloadTaskFile(teamName).then((response) => {
            if (response.ok) {
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = "task.txt";
                    a.click();
                    window.URL.revokeObjectURL(url);
                }).catch((error) => {
                    setAlertMessage({ message: error.message, description: "Błąd pobierania danych z serwera" });
                })
            } else {
                response.json().then((data) => {
                    setAlertMessage({ message: data.message, description: "Błąd serwera" });
                })
            }
        }).catch((error) => {
            setAlertMessage({ message: error.message, description: "Błąd połączenia z serwerem" });
        })
    }

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
            {
                alertMessage &&
                <Alert
                    title='Wystąpił błąd'
                    message={alertMessage.message}
                    description={alertMessage.description}
                    buttonOneText='Ok'
                    buttonOneAction={() => setAlertMessage(null)}
                />
            }
            <div className='pagewidth testtask'>
                <h2 className='header header__yellow'>{pageText.title}</h2>
                <div className='testtask__content'>
                    <section className='testtask__markdown'>
                        <ReactMarkdown>{taskMD}</ReactMarkdown>
                    </section>
                    <h4 className='header header__yellow'>Pobierz plik z zadaniem</h4>
                    <Button
                        className='btn btn__primary'
                        border
                        width="100%"
                        onClick={handleDownloadTask}
                    >
                        {pageText.download}
                    </Button>
                </div>
                <form className='testtask__answer' onSubmit={hundleSubmit}>
                    <div className='testtask-anwser__header'>
                        <h4 className='header header__yellow'>Prześlij odpowiedź</h4>
                        <span>Pozostałe próby: {taskData?.chances}</span>
                    </div>
                    <div>
                        <Input
                            pageText={completed === null ? pageText.form.answer.notFinished : completed ? pageText.form.answer.completed : pageText.form.answer.finished}
                            id="answer"
                            name="answer"
                            showLabel={false}
                            showError={showError}
                            type='text'
                            inputDisabled={inputsDisabled}
                            requrired
                            maxLength={30}
                            minLength={1}
                            pattern={EnglishAlphabetRegexString}
                        />
                        <Button
                            className='btn btn__primary'
                            type='submit'
                            width='100%'
                            border
                            disabled={inputsDisabled}
                            onClick={() => setShowError(true)}
                        >
                            {completed !== null ? pageText.form.button.active : inputsDisabled ? pageText.form.button.disabled : pageText.form.button.active}
                        </Button>
                    </div>
                    <span className={`input__span${customError ? " input__span--visible" : ""}`}>{customError}</span>
                </form>
            </div>
        </Page>
    )
}

export default TestTaskPage