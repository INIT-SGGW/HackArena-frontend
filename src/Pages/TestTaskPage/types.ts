import { PageMetaText } from "../../Library";

export interface PageText extends PageMetaText {
    title: string;
    download: string;
    form: {
        answer: {
            notFinished: {
                label: string;
                placeholder: string;
                errorMessage: string;
            },
            finished: {
                label: string;
                placeholder: string;
                errorMessage: string;
            },
            completed: {
                label: string;
                placeholder: string;
                errorMessage: string;
            },
        },
        errors: {
            wrongAnswer: string;
        }
        button: {
            active: string;
            disabled: string;
        }
    }
}