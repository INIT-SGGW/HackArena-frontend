import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import "./AccountPage.css";
import { useNavigate } from "react-router-dom";

import { Alert, AccountService, AuthenticationService, Button, Page, GetTeamResponseBody, useAuth, TextRegexString, TextRegex, UpdateTeamRequestBody, testTaskStartDate, dateFormat, testTaskEndDate, DateFormat } from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import { PageText } from "./types";
import VerifiedIcon from "../../Assets/verified.svg";
import UnverifiedIcon from "../../Assets/notVerified.svg";
import EditIcon from "../../Assets/edit.svg";
import CheckIcon from "../../Assets/check.svg";

function AccountPage() {
  const navigate = useNavigate();
  const pageText: PageText = text.account;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(null);
  const [alertDescription, setAlertDescription] = useState<string>("");
  const [teamData, setTeamData] = useState<GetTeamResponseBody | null>(null);
  const [showVerificationInfo, setShowVerificationInfo] = useState<boolean>(false);
  const [updateTeamActive, setUpdateTeamActive] = useState<boolean>(false);
  const [teamNameHeader, setTeamNameHeader] = useState<string | undefined>(undefined);
  const [showTask, setShowTask] = useState<boolean>(false);
  const { teamName, reset, logout } = useAuth();

  useEffect(() => {
    const now = new Date();
    if (now >= testTaskStartDate && now <= testTaskEndDate && !showVerificationInfo) {
      setShowTask(true);
      return;
    }
    setShowTask(false);
  }, [showTask, showVerificationInfo]);

  useEffect(() => {
    AccountService.getTeam(teamName).then((response) => {
      if (response.status === 202) {
        response.json().then((data: GetTeamResponseBody) => {
          setTeamData(data);
          setTeamNameHeader(data.teamName);
          const unverifiedMembersCount = data.teamMembers.filter((member) => !member.verified).reduce((acc, curr) => acc + 1, 0);
          setShowVerificationInfo(unverifiedMembersCount > 0);
        });
      } else {
        response.json().then((data) => {
          setAlertErrorMessage(data.error);
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
        }).catch(() => {
          setAlertErrorMessage("Błąd serwera");
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
        });
      }
    }).catch(() => {
      setAlertErrorMessage("Błąd połączenia z serwerem");
      setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
    });
  }, [navigate, teamName]);

  const hangleLogOut = () => {
    AuthenticationService.logout().then((response) => {
      if (response.status === 200) {
        logout();
      } else {
        response.json().then((data) => {
          setAlertErrorMessage(data.error);
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")

        }).catch(() => {
          setAlertErrorMessage("Bład serwera");
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")

        });
      }
    }).catch(() => {
      setAlertErrorMessage("Bład połączenia z serwerem");
      setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")

    });
  }

  const handleTeamUpdate = () => {
    if (updateTeamActive) {

      if (teamNameHeader === teamData?.teamName) {
        setUpdateTeamActive(false);
        return
      }

      if (!teamNameHeader || teamNameHeader?.length === 0) {
        setAlertDescription("Błąd podczas aktualizacji nazwy zespołu");
        setAlertErrorMessage("Nazwa zespołu nie może być pusta");

        setTeamNameHeader(teamData?.teamName);
        return
      }

      const body: UpdateTeamRequestBody = {
        teamName: teamNameHeader as string
      }

      AccountService.updateTeam(teamName, body).then((response) => {
        if (response.status === 202) {
          setUpdateTeamActive(false);
          setTeamData({ ...teamData as GetTeamResponseBody, teamName: teamNameHeader as string });
          localStorage.setItem("teamName", JSON.stringify(teamNameHeader));
        } else {
          response.json().then((data) => {
            setAlertErrorMessage(data.error);
            setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
            setTeamNameHeader(teamData?.teamName);
          }).catch(() => {
            setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
            setAlertErrorMessage("Błąd serwera");
            setTeamNameHeader(teamData?.teamName);
          });
        }
      }).catch(() => {
        setAlertErrorMessage("Błąd połączenia z serwerem");
        setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
        setTeamNameHeader(teamData?.teamName);
      });
    } else {
      setUpdateTeamActive(true);
    }
  }

  const handleDeleteTeam = () => {
    setShowAlert(false);
    AccountService.deleteTeam(teamName).then((response) => {
      if (response.status === 204) {
        reset();
        navigate("/wiadomosc/druzyna/usunieta");
      } else {
        response.json().then((data) => {
          setAlertErrorMessage(data.error);
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
        }).catch(() => {
          setAlertErrorMessage("Błąd serwera");
          setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
        });
      }
    }).catch(() => {
      setAlertErrorMessage("Błąd połączenia z serwerem");
      setAlertDescription("Wystąpił błąd podczas pobierania danych z serwera")
    });
  }

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="account pagewidth">
        {
          alertErrorMessage &&
          <Alert
            title="Błąd"
            description={alertDescription}
            message={alertErrorMessage}
            buttonOneText="Zamknij"
            buttonOneAction={() => setAlertErrorMessage(null)}
          />
        }
        <h2 className="header header__yellow">{teamData?.teamName}</h2>
        {/* <div className={`account__header${updateTeamActive ? " account__header--active" : ""}`}>
          <input
            disabled={!updateTeamActive}
            style={{
              width: `${teamNameHeader?.length ? teamNameHeader.length + 0.1 : 1}ch`
            }}
            onKeyDown={(e) => { if (e.key === "Enter") handleTeamUpdate() }}
            onInput={(e) => setTeamNameHeader(e.currentTarget.value)}
            value={teamNameHeader} />
          <div>
            <img
              src={updateTeamActive ? CheckIcon : EditIcon}
              alt={updateTeamActive ? "check" : "edit"}
              onClick={handleTeamUpdate} />
          </div>
        </div> */}
        {
          showVerificationInfo &&
          <div className="account__verification-info" >
            <span>W celu zapisania {teamData?.teamName} na HackArena 2.0, wszyscy członkowie zespołu muszą zostać zweryfikowani. Aby to zrobić, należy skorzystać z linka podanego w mailu przesłanym na podane przy rejestracji maile. W razie napotkania problemów, proszę się z nami skontaktowć przez maila kontakt@hackarena.pl.</span>
          </div>
        }
        {
          showTask &&
          <div className="account__task">

            <h5>Dziękujemy za zapisanie się na HackArena 2.0!</h5>
            <span>
              Aby w uczciwy sposób wybrać drużyny, które wezmą udział w wydarzeniu, wprowadziliśmy zadanie kwalifikacyjne.

              <br /><br />Zadanie polega na rozwiązaniu zadania programistycznego i nie powinno Wam zająć więcej niż 2 godziny.

              <br /><br />Rozwiązujecie jako drużyna, więc macie w sumie 3 próby na przesłanie poprawnej odpowiedzi.

              <br /><br />W pierwszej kolejnosci oceniana bedzie poprawność odesłanego rozwiązania, następnie czas po jakim to rozwiązanie przesłaliście. Pierwsze 16 drużyn, które najszybciej odesłały poprawne odpowiedzi, dostaną się na drugą edycję HackArena!

              <br /><br />
              <b>
                Czas zaczyna być mierzony od momentu kliknięcia przycisku poniżej.
              </b>

              <br /><br />Zadanie będzie dostępne do rozwiązania do {dateFormat(testTaskEndDate, DateFormat.FULL)}.
            </span>
            <Button
              className="btn btn__primary"
              border={true}
              width="100%"
              onClick={() => navigate("/zadanie")}
            >Zadanie</Button>
          </div>

        }
        <ul className="account__table">
          {
            teamData?.teamMembers.map((member, index) => (
              <li key={index} >
                {
                  member.verified ?
                    <span>{member.firstName} {member.lastName}</span> :
                    <span>{member.email}</span>
                }
                <img
                  src={member.verified ? VerifiedIcon : UnverifiedIcon}
                  alt={member.verified ? "verified" : "unverified"}
                  title={`${member.verified ? "Członek zespołu zweryfikowany" : "W celu weryfikacji konta, wejdź w link przesłany na maila. Zespół nie zostanie zapisany turniej do momentu weryfikacji wszystkich członków zespołu."}`} />
              </li>
            ))
          }
        </ul>
        <div className="account__settings">


          <Button
            className="btn btn__primary"
            border={true}
            onClick={() => navigate("/password/change")}
          >
            {pageText.buttons.resetPassword}
          </Button>
          {/* <Button
            className="btn btn__primary"
            border={true}
            onClick={() => setShowAlert(true)}
          >
            {pageText.buttons.deleteTeam}
          </Button> */}
          <Button
            className="btn btn__primary"
            border={true}
            onClick={hangleLogOut}
          >
            {pageText.buttons.logout}
          </Button>
          {
            showAlert &&
            <Alert
              title={pageText.alert.title}
              message={pageText.alert.message}
              buttonOneText={pageText.alert.buttons.delete}
              buttonOneAction={handleDeleteTeam}
              buttonTwoText={pageText.alert.buttons.cancel}
              buttonTwoAction={() => setShowAlert(false)}
            />
          }
        </div>
      </div>
    </Page>
  );
}

export default AccountPage;
