import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import "./AccountPage.css";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  TeamService,
  AuthenticationService,
  Button,
  Page,
  GetTeamResponseBody,
  useAuth,
  UpdateTeamRequestBody,
  testTaskStartDate,
  dateFormat,
  testTaskEndDate,
  DateFormat,
  FileUploader,
  getEventStatus,
  EventStatus,
} from "../../Library";

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
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(
    null
  );
  const [alertDescription, setAlertDescription] = useState<string>("");
  const [teamData, setTeamData] = useState<GetTeamResponseBody | null>(null);
  const [showVerificationInfo, setShowVerificationInfo] =
    useState<boolean>(false);
  const [updateTeamActive, setUpdateTeamActive] = useState<boolean>(false);
  const [teamNameHeader, setTeamNameHeader] = useState<string | undefined>(
    undefined
  );
  const [showTask, setShowTask] = useState<boolean>(false);
  const { teamName, logout } = useAuth();

  useEffect(() => {
    const now = new Date();
    if (
      now >= testTaskStartDate &&
      now <= testTaskEndDate &&
      !showVerificationInfo
    ) {
      setShowTask(true);
      return;
    }
    setShowTask(false);
  }, [showTask, showVerificationInfo]);

  useEffect(() => {
    TeamService.getTeam(teamName)
      .then((response) => {
        if (response.status === 202) {
          response.json().then((data: GetTeamResponseBody) => {
            setTeamData(data);
            setTeamNameHeader(data.teamName);
            const unverifiedMembersCount = data.teamMembers
              .filter((member) => !member.verified)
              .reduce((acc, curr) => acc + 1, 0);
            setShowVerificationInfo(unverifiedMembersCount > 0);
          });
        } else {
          response
            .json()
            .then((data) => {
              setAlertErrorMessage(data.error);
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            })
            .catch(() => {
              setAlertErrorMessage("Błąd serwera");
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            });
        }
      })
      .catch(() => {
        setAlertErrorMessage("Błąd połączenia z serwerem");
        setAlertDescription(
          "Wystąpił błąd podczas pobierania danych z serwera"
        );
      });
  }, [navigate, teamName]);

  const hangleLogOut = () => {
    AuthenticationService.logout()
      .then((response) => {
        if (response.status === 200) {
          logout();
        } else {
          response
            .json()
            .then((data) => {
              setAlertErrorMessage(data.error);
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            })
            .catch(() => {
              setAlertErrorMessage("Bład serwera");
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            });
        }
      })
      .catch(() => {
        setAlertErrorMessage("Bład połączenia z serwerem");
        setAlertDescription(
          "Wystąpił błąd podczas pobierania danych z serwera"
        );
      });
  };

  const handleTeamUpdate = () => {
    if (updateTeamActive) {
      if (teamNameHeader === teamData?.teamName) {
        setUpdateTeamActive(false);
        return;
      }

      if (!teamNameHeader || teamNameHeader?.length === 0) {
        setAlertDescription("Błąd podczas aktualizacji nazwy zespołu");
        setAlertErrorMessage("Nazwa zespołu nie może być pusta");

        setTeamNameHeader(teamData?.teamName);
        return;
      }

      const body: UpdateTeamRequestBody = {
        teamName: teamNameHeader as string,
      };

      TeamService.updateTeam(teamName, body)
        .then((response) => {
          if (response.status === 202) {
            setUpdateTeamActive(false);
            setTeamData({
              ...(teamData as GetTeamResponseBody),
              teamName: teamNameHeader as string,
            });
            localStorage.setItem("teamName", JSON.stringify(teamNameHeader));
          } else {
            response
              .json()
              .then((data) => {
                setAlertErrorMessage(data.error);
                setAlertDescription(
                  "Wystąpił błąd podczas pobierania danych z serwera"
                );
                setTeamNameHeader(teamData?.teamName);
              })
              .catch(() => {
                setAlertDescription(
                  "Wystąpił błąd podczas pobierania danych z serwera"
                );
                setAlertErrorMessage("Błąd serwera");
                setTeamNameHeader(teamData?.teamName);
              });
          }
        })
        .catch(() => {
          setAlertErrorMessage("Błąd połączenia z serwerem");
          setAlertDescription(
            "Wystąpił błąd podczas pobierania danych z serwera"
          );
          setTeamNameHeader(teamData?.teamName);
        });
    } else {
      setUpdateTeamActive(true);
    }
  };

  const handleDeleteTeam = () => {
    setShowAlert(false);
    TeamService.deleteTeam(teamName)
      .then((response) => {
        if (response.status === 204) {
          logout();
          navigate("/wiadomosc/druzyna/usunieta");
        } else {
          response
            .json()
            .then((data) => {
              setAlertErrorMessage(data.error);
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            })
            .catch(() => {
              setAlertErrorMessage("Błąd serwera");
              setAlertDescription(
                "Wystąpił błąd podczas pobierania danych z serwera"
              );
            });
        }
      })
      .catch(() => {
        setAlertErrorMessage("Błąd połączenia z serwerem");
        setAlertDescription(
          "Wystąpił błąd podczas pobierania danych z serwera"
        );
      });
  };

  const handleSendFile = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      TeamService.uploadSolution(teamName, file).then((response) => {
        if (response.status === 201) {
          resolve();
        } else {
          response
            .json()
            .then((data) => {
              reject(new Error(data.error));
            })
            .catch(() => {
              reject(new Error("Błąd serwera"));
            });
        }
      });
    });
  }

  return (
    <Page
      pageTitle={pageText.meta.title}
      description={pageText.meta.description}
      noIndex
    >
      <div className="account pagewidth">
        {alertErrorMessage && (
          <Alert
            title="Błąd"
            description={alertDescription}
            message={alertErrorMessage}
            buttonOneText="Zamknij"
            buttonOneAction={() => setAlertErrorMessage(null)}
          />
        )}
        <h2 className="header header__yellow">{teamData?.teamName}</h2>
        {
          getEventStatus() === EventStatus.EventLive &&
          <>
            <FileUploader sendFile={handleSendFile} fileTypes={["zip"]} />
            <Button className="btn btn__primary" onClick={() => navigate("/konto/dokumenty")} border width="100%" >Dokumenty</Button>
          </>
        }
        {showVerificationInfo && (
          <div className="account__verification-info">
            <span>
              W celu zapisania {teamData?.teamName} na HackArena 2.0, wszyscy
              członkowie zespołu muszą zostać zweryfikowani. Aby to zrobić,
              należy skorzystać z linka podanego w mailu przesłanym na podane
              przy rejestracji maile. W razie napotkania problemów, proszę się z
              nami skontaktowć przez maila kontakt@hackarena.pl.
            </span>
          </div>
        )}

        <ul className="account__table">
          {teamData?.teamMembers.map((member, index) => (
            <li key={index}>
              {member.verified ? (
                <span>
                  {member.firstName} {member.lastName}
                </span>
              ) : (
                <span>{member.email}</span>
              )}
              <img
                src={member.verified ? VerifiedIcon : UnverifiedIcon}
                alt={member.verified ? "verified" : "unverified"}
                title={`${member.verified
                  ? "Członek zespołu zweryfikowany"
                  : "W celu weryfikacji konta, wejdź w link przesłany na maila. Zespół nie zostanie zapisany turniej do momentu weryfikacji wszystkich członków zespołu."
                  }`}
              />
            </li>
          ))}
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
          {showAlert && (
            <Alert
              title={pageText.alert.title}
              message={pageText.alert.message}
              buttonOneText={pageText.alert.buttons.delete}
              buttonOneAction={handleDeleteTeam}
              buttonTwoText={pageText.alert.buttons.cancel}
              buttonTwoAction={() => setShowAlert(false)}
            />
          )}
        </div>
      </div>
    </Page>
  );
}

export default AccountPage;
