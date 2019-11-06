import {
    emailService
} from '../services/email.service.js'

import emailPreview from '../cmps/email-preview.cmp.js';


export default {
    name: 'email-list',
    data(){
        return {
            emails: []
        }
    },
    template: `
        <section class="email-list-container">
            <h1>Inbox</h1>
            <email-preview v-for="email in emails" :key="email.id" :email="email"></email-preview>
        </section>
    `,
    components: {
        emailPreview
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                console.log(emails);
                this.emails = emails;
            })
    }
}