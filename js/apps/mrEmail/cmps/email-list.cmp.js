import {
    emailService
} from '../services/email.service.js'

import emailPreview from '../cmps/email-preview.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';


export default {
    name: 'email-list',
    data() {
        return {
            emails: [],
            emailsRead: 0,
            filterBy: null
        }
    },
    template: `
        <section class="email-list-container cmp-main-container">
            <div class="list-header flex space-between align-center">
                <email-filter @filtered="setFilter"></email-filter>
                <p class="inline" v-if="emails">Emails read: {{emailsRead}}/{{emails.length}}</p>
            </div>
            <email-preview v-for="email in emailsToShow" :key="email.id" :email="email"></email-preview>
        </section>
    `,
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            let regex = new RegExp(`${this.filterBy.txt}`, 'i');
            let newEmails = this.emails.filter(email => {
                let readFilter = this.filterBy.read;

                return (regex.test(email.body) || regex.test(email.subject)) &&
                    (readFilter === 'read' && email.isRead ||
                    readFilter === 'unread' && !email.isRead ||
                    readFilter === 'all');

            })
            return newEmails;
        }
    },
    components: {
        emailPreview,
        emailFilter
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails;
            });
        emailService.countReadEmails()
            .then(res => {
                this.emailsRead = res
            })
    }
}