import {
    emailService
} from '../services/email.service.js'

import sideBar from '../cmps/side-bar.cmp.js';
import emailAdd from './email-compose.cmp.js';

export default {
    name: 'email-app',
    data() {
        return {
            emails: []
        }
    },
    template: `
        <section class="email-app-container animated fadeIn">
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