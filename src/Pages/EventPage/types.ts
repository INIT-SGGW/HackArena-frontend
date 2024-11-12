import { PageMetaText } from "../../Library"

export interface PageText extends PageMetaText {
    photos: string
}

export interface CheckEventStatusData {
    finished: boolean
    [key: string]: any
}

export interface FinishedEventData {
    finished: boolean
    banner: {
        title: String
        date: String
        description: String
    },
    task: {
        title: string
        description: string
    },
    results: {
        title: String
        description: String
        firstPlace: String
        secondPlace: String
        thirdPlace?: String
        fourthPlace?: String
        teams: string[]
    },
    highlightInfo: {
        text: string
        url?: string
    },
    photos: {
        title: String
        list: string[]
    },
    format?: {
        title: string
        description: string
    },
    highlights?: {
        title: string
        description: string,
        video: string
    },
    sponsors?: boolean
}

export const isFinishedEventData = (eventData: FinishedEventData | UpcomingEventData | null): eventData is FinishedEventData => {
    return (eventData as CheckEventStatusData).finished === true
}

export interface UpcomingEventData {
    finished: boolean
    banner: {
        title: String
        date: String
        description: String
    },
    clock: string
    generalInformation: {
        title: string
        description: string
    },
    task: {
        title: string
        description: string
    },
    format: {
        title: string,
        description: string
    },
    agenda: {
        title: string,
        schedule: {
            [key: string]: [
                {
                    time: string,
                    event: string
                }
            ]
        }
    }
    faq: {
        title: string,
        questions: {
            question: string,
            answer: string
        }[]
    }
}

export const isUpcomingEventData = (eventData: FinishedEventData | UpcomingEventData | null): eventData is UpcomingEventData => {
    return (eventData as CheckEventStatusData).finished === false
}
