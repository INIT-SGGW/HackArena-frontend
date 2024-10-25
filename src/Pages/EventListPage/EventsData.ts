import { EventsData } from "./types";
import HackArena1_0Image from "../../Assets/hackarena_1_0_bw.jpg"
import HackArena2_0Image from "../../Assets/hackarena_2_0_bw.jpg"

export const events: EventsData = {
    count: 2,
    upcoming: [
        {
            title: "HackArena 2.0",
            date: "2021-10-02",
            banner: HackArena2_0Image,
            url: "/wydarzenia/hackarena2_0"
        }
    ],
    finished: [
        {
            title: "HackArena 1.0",
            date: "2021-06-12",
            banner: HackArena1_0Image,
            url: "/wydarzenia/hackarena1_0"
        }
    ]
}