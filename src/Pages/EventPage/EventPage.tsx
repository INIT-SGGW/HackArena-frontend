import React, { useEffect } from "react";
import "./EventPage.css";
import { NavigateFunction, useParams, useNavigate } from "react-router-dom";

import {
    Agenda, Button, getEventStatus, EventStatus, Sponsors, dateFormat, DateFormat,
    registrationEndDate, replacePlaceholders, Page, FAQComponent, TitleAndDesc, PhotoGallery,
    eventStartDate
} from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import HackarenaFormatImage from "../../Assets/HackArena2_0Format.svg";
import {
    CheckEventStatusData,
    FinishedEventData,
    isFinishedEventData,
    isUpcomingEventData,
    PageText,
    UpcomingEventData,
} from "./types";
import { AllEventsData } from "./EventData";



function EventPage(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { eventName } = useParams<{ eventName: string }>();
    const [eventData, setEventData] = React.useState<
        FinishedEventData | UpcomingEventData | null
    >(null);
    const pageText: PageText = text.event;

    useEffect(() => {
        if (eventName === undefined) {
            navigate("/404");
        } else {
            //TODO: get event information from backend
            const data: CheckEventStatusData = AllEventsData[eventName];

            if (data.finished) {
                setEventData(data as FinishedEventData);
            } else {
                setEventData(data as UpcomingEventData);
            }
        }
    }, [eventName, navigate]);

    return (
        <Page
            pageTitle={
                eventData
                    ? (eventData.banner.title as string) + " | HackArena"
                    : pageText.meta.title
            }
            description={
                eventData
                    ? (eventData.banner.description as string)
                    : pageText.meta.description
            }
        >
            <div className="event">
                {eventData !== null && isFinishedEventData(eventData) && (
                    <>
                        <div className="event--welcome pagewidth">
                            <h1>{eventData.banner.title}</h1>
                            <span>{eventData.banner.date}</span>
                            <h6>{eventData.banner.description}</h6>
                        </div>
                        <div className="event--clock">
                            <div className="pagewidth">
                                <h4>{eventData.highlightInfo}</h4>
                            </div>
                        </div>
                        <TitleAndDesc text={eventData.task} />
                        <div className="event--section">
                            <h2 className="header__white">{eventData.results.title}</h2>
                            <span>{eventData.results.description}</span>
                            <ol type="I">
                                <li>{eventData.results.teams.firstPlace}</li>
                                <li>{eventData.results.teams.secondPlace}</li>
                            </ol>
                        </div>
                        <div className="event--section event--section__photos">
                            <h2 className="header__white">{pageText.photos}</h2>
                            <PhotoGallery photos={eventData.photos.list} />
                        </div>
                    </>
                )}
                {eventData !== null && isUpcomingEventData(eventData) && (
                    <>
                        <div className="event--welcome pagewidth">
                            <h1>{eventData.banner.title}</h1>
                            <span>{eventData.banner.date}</span>
                            <h6>{eventData.banner.description}</h6>
                        </div>

                        <div className="event--clock">
                            <div className="pagewidth">
                                {getEventStatus() === EventStatus.CloseToRegistration && (
                                    <h4>{eventData.clock}</h4>
                                )}
                                {getEventStatus() === EventStatus.RegistrationOpen && (
                                    <div className="section--column-1">
                                        <h4>
                                            {replacePlaceholders("Rejestracja otwarta do {0}", [
                                                dateFormat(registrationEndDate, DateFormat.DATE),
                                            ])}
                                        </h4>
                                        <Button className="btn btn__primary-b" border onClick={() => navigate("/rejestracja")} >Zarejestruj się</Button>
                                    </div>
                                )}
                                {
                                    getEventStatus() === EventStatus.RegistrationClosed && (
                                        <h4>{replacePlaceholders("Początek już {0} o {1}", [
                                            dateFormat(eventStartDate, DateFormat.DATE),
                                            dateFormat(eventStartDate, DateFormat.TIME)
                                        ])}</h4>
                                    )
                                }
                                {getEventStatus() === EventStatus.EventLive && (
                                    <h4>HackArena w trakcie!</h4>
                                )}
                                {getEventStatus() === EventStatus.EventDone && (
                                    <h4>Dziękujemy za udział</h4>
                                )}
                            </div>
                        </div>
                        <TitleAndDesc text={eventData.generalInformation} />
                        <div className="prizes pagewidth event--section">
                            <div className="prizes__header">
                                <h2 className="header__white">Nagrody</h2>
                                <span>
                                    Wszyscy uczestnicy otrzymają giftbagi na początku wydarzenia
                                </span>
                            </div>
                            <ul className="prizes__podium">
                                <li className="prizes__standing prizes__standing--second">
                                    <h4>Drugie miejsce</h4>
                                    <ul>
                                        <li>Mysz Logitech G Pro X Superlight</li>
                                        <li>Podkładka SteelSeries Qck Edge</li>
                                    </ul>
                                </li>
                                <li className="prizes__standing prizes__standing--first">
                                    <h4>Pierwsze miejsce</h4>
                                    <ul>
                                        <li>Słuchawki Logitech G Pro X</li>
                                        <li>Mysz Logitech G Pro X Superlight</li>
                                        <li>Podkładka SteelSeries Qck Edge</li>
                                    </ul>
                                </li>
                                <li className="prizes__standing prizes__standing--third">
                                    <h4>Trzecie miejsce</h4>
                                    <ul>
                                        <li>Mysz SteelSeries Rival 5</li>
                                        <li>Podkładka SteelSeries Qck Edge</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <TitleAndDesc text={eventData.task} />
                        <TitleAndDesc text={eventData.format} />
                        <div className="event--format pagewidth">
                            <img src={HackarenaFormatImage} alt="HackArena 2.0 format" />
                        </div>
                        <Agenda />
                        <div className="event--section">
                            <Sponsors />
                        </div>

                        <div className="event--section pagewidth">
                            <h2 className="header__white">{eventData.faq.title}</h2>
                            <FAQComponent questions={eventData.faq.questions} />
                        </div>

                        {/* <div className="event--section">
                                <h2>{eventText.results.title}</h2>
                                <span>{eventText.results.description}</span>
                                <ol type="I">
                                    <li>{eventText.results.teams.firstPlace}</li>
                                    <li>{eventText.results.teams.secondPlace}</li>
                                </ol>
                            </div> */}
                    </>
                )}
            </div>
        </Page>
    );
}

export default EventPage;
