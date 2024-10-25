import { useEffect, useState } from 'react';
import { Alert, Button, GetMatchNameResponseBody, Page, TeamService, useAuth } from '../../Library'
import './Documents.css'

import { ReposData, GameReposData } from './ReposData'

function Documents() {
    const { teamName } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [isMatchUploaded, setIsMatchUploaded] = useState<boolean>(false);

    useEffect(() => {
        TeamService.getMatchName(teamName).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setIsMatchUploaded((data as GetMatchNameResponseBody).isMatchFileSend);
                })
            }
        }).catch((error) => {
            setError(error.message);
        });
    })

    const handleDownloadMatchFile = () => {
        setButtonDisabled(true);
        TeamService.downloadMatchFile(teamName).then((response) => {
            if (response.ok) {
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = "match.json";
                    a.click();
                })
            } else {
                setError("Błąd serwera");
            }
        }).catch((error) => {
            setError(error.message);
        });
        setButtonDisabled(false);
    }

    return (
        <Page pageTitle='Dokumenty | HackArena' description='Strona z dokumentami do HackArena 2.0' noIndex>
            {
                error &&
                <Alert
                    title="Błąd"
                    description='Wystąpił błąd podczas pobierania pliku'
                    message={error}
                    buttonOneText='Ok'
                    buttonOneAction={() => setError(null)}
                />
            }
            <div className='documents pagewidth'>
                <div className='documents__header'>
                    <h2 className='header header__yellow'>Dokumenty</h2>
                    <p>Poniżej znajdziesz instrukcję do gry, skompresowane pliki gry oraz linki do repozytoriów gry i API Wrapperów</p>
                </div>
                <Button onClick={() => window.open("/Assets/Game/HackArena 2.0 - instrukcja.pdf")} className='btn btn__primary' border width='100%' >Instrukcja</Button>
                <div className='documents__api-wrappers'>
                    <h5>MonoTanks</h5>
                    <ul>
                        {
                            GameReposData.map((repo, index) => {
                                const handleClick = () => {
                                    if (repo.url) {
                                        window.open(repo.url)
                                    } else {
                                        window.open(`/Assets/Game/${repo.file}`)
                                    }
                                }

                                return (
                                    <li key={index}>
                                        <p>{repo.title}</p>
                                        <Button onClick={handleClick} disabled={buttonDisabled} className='btn btn__primary' border>{repo.url ? "Repo" : "Pobierz"}</Button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='documents__api-wrappers'>
                    <h5>API Wrappery</h5>
                    <ul>
                        {
                            ReposData.map((repo, index) => {
                                return (
                                    <li key={index}>
                                        <p>{repo.title}</p>
                                        <Button onClick={() => window.open(repo.url)} className='btn btn__primary' border  >Repo</Button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    isMatchUploaded &&
                    <div className='documents__api-wrappers'>
                        <h5>Plik z meczu</h5>
                        <ul>
                            <li>
                                <p>Mecz</p>
                                <Button onClick={handleDownloadMatchFile} className='btn btn__primary' border>Pobierz</Button>
                            </li>
                        </ul>
                    </div>}

            </div>
        </Page>
    )
}

export default Documents