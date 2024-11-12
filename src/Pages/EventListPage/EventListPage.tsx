import { useEffect, useState } from 'react'
import './EventListPage.css'

//COMPONENTS
import { EventListBanner, Page } from '../../Library'
import { EventBannerData, EventsData, PageText } from './types'

//ASSETS
import text from '../../Library/Assets/Text/main.json'
import { events } from './EventsData'

function EventListPage(): JSX.Element {
    const pageText: PageText = text.eventList;
    const [eventsData, setEventsData] = useState<EventsData | null>(null)
    useEffect(() => {
        //TODO: get events data from backend
        setEventsData(events);
    }, [])

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description}>
            <div className='events pagewidth'>
                <div className='events__header'>
                    <h2 className='header__yellow header__wider header__taller'>{pageText.title}</h2>
                </div>
                {
                    (eventsData === null || eventsData.count === 0) &&
                    <h5 className='events__noevents'>{pageText.noEvents}</h5>
                }
                {
                    eventsData !== null && eventsData.count > 0 &&
                    <>
                        {
                            eventsData.upcoming.length > 0 &&
                            <>
                                <h3 className='header__yellow'>{pageText.upcoming}</h3>
                                {
                                    eventsData.upcoming.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event: EventBannerData, index: number) => (
                                        <EventListBanner key={index} image={event.banner} title={event.title} url={event.url} isPresent={true} />
                                    ))
                                }
                            </>
                        }
                        {
                            eventsData.finished.length > 0 &&
                            <>
                                <h3 className='header__white'>{pageText.finished}</h3>
                                {
                                    eventsData.finished.sort((a, b) => b.date.getTime() - a.date.getTime()).map((event: EventBannerData, index: number) => (
                                        <EventListBanner key={index} image={event.banner} title={event.title} url={event.url} />
                                    ))
                                }
                            </>
                        }
                    </>
                }
            </div>
        </Page>
    )
}

export default EventListPage