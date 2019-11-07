import {
    emailService
} from '../services/email.service.js'

import sideBar from '../cmps/side-bar.cmp.js';
import emailAdd from '../cmps/email-compose.cmp.js';

export default {
    name: 'email-app',
    data() {
        return {
            emails: []
        }
    },
    template: `
        <section class="email-app-container container">
            <h1>Email app page</h1>
            <side-bar class="side-bar"></side-bar>
            <router-view />         
        </section>
    `,
    components: {
        sideBar,
        emailAdd
    },
    created() {
        emailService.getEmails()
            .then((emails) => {
                this.emails = emails
            })
    }
}