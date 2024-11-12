import { EventsData } from "./types";
import HackArena1_0Image from "../../Assets/hackarena_1_0_bw.jpg"
import HackArena2_0Image from "../../Assets/hackarena_2_0_bw.jpg"

export const events: EventsData = {
    count: 2,
    upcoming: [
    ],
    finished: [
        {
            title: "HackArena 2.0",
            date: new Date("2024-10-26"),
            banner: HackArena2_0Image,
            url: "/wydarzenia/hackarena2_0"
        },
        {
            title: "HackArena 1.0",
            date: new Date("2024-06-02"),
            banner: HackArena1_0Image,
            url: "/wydarzenia/hackarena1_0"
        }

    ]
}