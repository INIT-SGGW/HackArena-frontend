import { PageMetaText } from "../../Library";

export interface PageText extends PageMetaText {
    title: string
    formFields: {
        password: {
            label: string,
            placeholder: string,
            errorMessage: string
        }
        repeatPassword: {
            label: string,
            placeholder: string,
            errorMessage: string
        }
    }
    button: {
        active: string
        disabled: string
    }
}