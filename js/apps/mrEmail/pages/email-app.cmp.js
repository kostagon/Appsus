import {
    emailService
} from '../services/email.service.js'

import sideBar from '../cmps/side-bar.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailAdd from '../cmps/email-add.cmp.js';

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
            <router-view/>            
        </section>
    `,
    components: {
        sideBar,
        emailList,
        emailAdd
    },
    created() {
        emailService.getEmails()
            .then((emails) => {
                console.log(emails);
                this.emails = emails
            })
    }
}