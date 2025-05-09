import { PageMetaText } from "../../Library"

export interface PageText extends PageMetaText {
    title: string
    upcoming: string
    finished: string
    noEvents: string
}

export interface EventBannerData {
    title: string
    date: Date
    banner: string
    url: string
}

export interface EventsData {
    count: number
    upcoming: EventBannerData[]
    finished: EventBannerData[]
}