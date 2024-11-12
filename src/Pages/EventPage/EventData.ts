import { FinishedEventData, UpcomingEventData } from "./types";

export const AllEventsData: {
    [key: string]: FinishedEventData | UpcomingEventData;
} = {
    hackarena1_0: {
        finished: true,
        banner: {
            title: "HackArena 1.0",
            date: "02.06.2024 na SGGW w Warszawie",
            description:
                'HackArena 1.0 to pierwsza edycja hackathonu organizowanego przez Koło Naukowe "init". W wydarzeniu wzięło udział 15 osób, które stworzyły 6 botów.',
        },
        highlightInfo: { text: "Dziękujemy za udział wszystkim uczestnikom" },
        task: {
            title: "Zadanie",
            description:
                "Drużyny dostały zadanie stworzenie bota do gry typu <b>Bomberman.</b> Do wykonania zadania należało wykorzystać <b>język Python</b> i należało się zmieścić w czasie <b>8 godzin.</b>",
        },
        results: {
            title: "Wyniki",
            description: "Podium pierwszej edycji HackAreny",
            firstPlace: "Pierwsze miejsce",
            secondPlace: "Drugie miejsce",
            teams: ["Wild Pythons", "Essanse of Code"],
        },

        photos: {
            title: "Zdjęcia",
            list: [
                "/Assets/HackArena1/DSC_6107",
                "/Assets/HackArena1/DSC_6131",
                "/Assets/HackArena1/DSC_6132",
                "/Assets/HackArena1/DSC_6144",
                "/Assets/HackArena1/DSC_6158",
                "/Assets/HackArena1/DSC_6165",
                "/Assets/HackArena1/DSC_6172",
                "/Assets/HackArena1/DSC_6173",
                "/Assets/HackArena1/DSC_6184",
                "/Assets/HackArena1/DSC_6187",
                "/Assets/HackArena1/DSC_6190",
                "/Assets/HackArena1/DSC_6222",
                "/Assets/HackArena1/DSC_6226",
                "/Assets/HackArena1/DSC_6228",
                "/Assets/HackArena1/DSC_6235",
                "/Assets/HackArena1/DSC_6242",
                "/Assets/HackArena1/DSC_6245",
                "/Assets/HackArena1/DSC_6248",
                "/Assets/HackArena1/DSC_6251",
                "/Assets/HackArena1/DSC_6268",
                "/Assets/HackArena1/DSC_6284",
                "/Assets/HackArena1/DSC_6294",
                "/Assets/HackArena1/DSC_6588",
                "/Assets/HackArena1/DSC_6590",
                "/Assets/HackArena1/DSC_6597",
                "/Assets/HackArena1/DSC_6605",
                "/Assets/HackArena1/DSC_6606",
                "/Assets/HackArena1/DSC_6608",
                "/Assets/HackArena1/DSC_6613",
                "/Assets/HackArena1/DSC_6623",
                "/Assets/HackArena1/DSC_6629",
                "/Assets/HackArena1/DSC_6631",
                "/Assets/HackArena1/DSC_6638",
                "/Assets/HackArena1/DSC_6639",
                "/Assets/HackArena1/DSC_6640",
                "/Assets/HackArena1/DSC_6642",
                "/Assets/HackArena1/DSC_6645",
                "/Assets/HackArena1/DSC_6650",
                "/Assets/HackArena1/DSC_6652",
                "/Assets/HackArena1/DSC_6654",
                "/Assets/HackArena1/DSC_6664",
                "/Assets/HackArena1/DSC_6669",
            ],
        },
    },
    hackarena2_0: {
        finished: true,
        banner: {
            title: "HackArena 2.0",
            date: "26-27.10.2024 na SGGW w Warszawie",
            description:
                'Druga edycja hackathonu organizowanego przez Koło Naukowe "init". W tej edycji wzieło udział 16 drużyn, a zwycięzcy otrzymali nagrody o łącznej wartości 6000 zł.',
        },
        highlightInfo: {
            text: "Pobierz i zagraj w grę z HackAreny 2.0",
            url: "https://github.com/INIT-SGGW/HackArena2.0-MonoTanks"
        },
        task: {
            title: "Zadanie",
            description:
                "Zadaniem uczestników HackArena 2.0 było <b>stworzenie bota</b> do gry <a href='https://github.com/INIT-SGGW/HackArena2.0-MonoTanks' target='_blank'>MonoTanks</a>. W maksymalnie <b>3 osobowych grupach</b> mieli 2 dni na implementację algorytmu zdolnego do samodzielnego przeprowadzenia rozgrywki. Swoje rozwiązania pisali w <b>Python, Java, C#, C++, JavaScript, TypeScript, Go i Rust.</b>",
        },
        format: {
            title: "Format turnieju",
            description:
                "Turniej został rozegrany <b>w trzech rundach.</b> W każdej rundzie uczestnicy zmagali się w <b>pojedynkach 1v1v1v1</b>. W pierwszym etapie, przydział do poszczególnych meczów był roztrzygnięty poprzez <b>losowanie.</b> Następnie w celu przejścia do kolejnych faz, bot danej drużyny musiał się znaleźć w <b>top 2 aktualnie rozgrywanego starcia.</b>  W wielkim finale, spośród 4 finalistów, został wyłoniony <b>mistrz HackAreny 2.0.</b>",
        },

        results: {
            title: "Wyniki",
            description: "Cztery najlepsze drużyny HackAreny 2.0",
            firstPlace: "Pierwsze miejsce",
            secondPlace: "Drugie miejsce",
            teams: [
                "Trzy Kwaterki",
                "Agresywne Tostery",
                "Azbestmasters",
                "Młodzi Sarmaci",
            ],
        },
        sponsors: true,
        photos: {
            title: "Zdjęcia",
            list: [
                "/Assets/HackArena2/Photo/DSC06782",
                "/Assets/HackArena2/Photo/DSC06783",
                "/Assets/HackArena2/Photo/DSC_7289",
                "/Assets/HackArena2/Photo/DSC06827",
                "/Assets/HackArena2/Photo/DSC_7285",
                "/Assets/HackArena2/Photo/DSC_7308",
                "/Assets/HackArena2/Photo/DSC06831",
                "/Assets/HackArena2/Photo/DSC06729",
                "/Assets/HackArena2/Photo/DSC06748",
                "/Assets/HackArena2/Photo/DSC06845",
                "/Assets/HackArena2/Photo/DSC_7457",
                "/Assets/HackArena2/Photo/DSC06884",
                "/Assets/HackArena2/Photo/DSC06894",
                "/Assets/HackArena2/Photo/DSC06897",

                "/Assets/HackArena2/Photo/DSC_7373",
                "/Assets/HackArena2/Photo/DSC_7374",
                "/Assets/HackArena2/Photo/DSC_7411",
                "/Assets/HackArena2/Photo/DSC_7414",
                "/Assets/HackArena2/Photo/DSC06902",

                "/Assets/HackArena2/Photo/DSC06956",
                "/Assets/HackArena2/Photo/DSC_7500",
                "/Assets/HackArena2/Photo/DSC06949",
                "/Assets/HackArena2/Photo/DSC06980",
                "/Assets/HackArena2/Photo/DSC_7669",
                "/Assets/HackArena2/Photo/DSC07003",

                "/Assets/HackArena2/Photo/DSC07029",
                "/Assets/HackArena2/Photo/DSC07038",
                "/Assets/HackArena2/Photo/DSC06973",

                "/Assets/HackArena2/Photo/DSC07069",

                "/Assets/HackArena2/Photo/DSC07072",

                "/Assets/HackArena2/Photo/DSC07075",
                "/Assets/HackArena2/Photo/DSC07076",
                "/Assets/HackArena2/Photo/DSC07092",

                "/Assets/HackArena2/Photo/DSC07077",
                "/Assets/HackArena2/Photo/DSC07080",

                "/Assets/HackArena2/Photo/DSC07085",
                "/Assets/HackArena2/Photo/DSC07089",
                "/Assets/HackArena2/Photo/DSC07094",
                "/Assets/HackArena2/Photo/DSC07095",
                "/Assets/HackArena2/Photo/DSC07099",
                "/Assets/HackArena2/Photo/DSC07100",
                "/Assets/HackArena2/Photo/DSC07103",
                "/Assets/HackArena2/Photo/DSC07104",
                "/Assets/HackArena2/Photo/DSC07116",
                "/Assets/HackArena2/Photo/DSC07162",
                "/Assets/HackArena2/Photo/DSC07166",
                "/Assets/HackArena2/Photo/DSC07459",
                "/Assets/HackArena2/Photo/DSC07513",
                "/Assets/HackArena2/Photo/DSC07545",
                "/Assets/HackArena2/Photo/DSC07564",
                "/Assets/HackArena2/Photo/DSC07616",
                "/Assets/HackArena2/Photo/DSC07586",
                "/Assets/HackArena2/Photo/DSC07592",
                "/Assets/HackArena2/Photo/DSC07593",
                "/Assets/HackArena2/Photo/DSC07718",

                "/Assets/HackArena2/Photo/DSC_7751",
                "/Assets/HackArena2/Photo/DSC_7793",
                "/Assets/HackArena2/Photo/DSC_7800",
                "/Assets/HackArena2/Photo/DSC_7835",
                "/Assets/HackArena2/Photo/DSC_7858",
                "/Assets/HackArena2/Photo/DSC_7860",
                "/Assets/HackArena2/Photo/DSC07816",
                "/Assets/HackArena2/Photo/DSC07857",
                "/Assets/HackArena2/Photo/DSC07870",
                "/Assets/HackArena2/Photo/DSC07882",

                "/Assets/HackArena2/Photo/DSC_7955",
                "/Assets/HackArena2/Photo/DSC07551",

            ],
        },
        highlights: {
            title: "Najlepsze momenty",
            description:
                "Obejrzyj najlepsze momenty z finałowej rozgrywki HackArena 2.0!",
            video: "/Assets/HackArena2/Video/HackArena_2_0_Highlights_1080.mp4",
        },
    },
};
