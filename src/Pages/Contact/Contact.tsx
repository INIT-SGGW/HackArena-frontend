import './Contact.css'

import { Page, SocialMedia } from '../../Library'

import { PageText } from './types'
import text from '../../Library/Assets/Text/main.json'

function Contact() {
    const pageText: PageText = text.contact
    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} >
            <div className='contact pagewidth'>
                <h1 className='header__yellow'>Kontakt</h1>
                <div className='contact__content'>
                    {
                        pageText.blocks.map((block, index) => {
                            return (
                                <div key={index} className='contact__block'>
                                    <h5 className='header'>{block.title}</h5>
                                    <p>{block.content}</p>
                                    {
                                        block.type === 'social_media' &&
                                        <SocialMedia black />
                                    }
                                    {
                                        block.type === 'email' &&
                                        <a href={`mailto:${block.email}`} >{block.email}</a>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </Page>
    )
}

export default Contact