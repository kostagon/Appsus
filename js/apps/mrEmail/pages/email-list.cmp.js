import {
    emailService
} from '../services/email.service.js';
import {
    eventBus
} from '../../../services/eventbus-service.js';

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
        <section class="email-list-container">
            <div class="list-header flex space-between align-center">
                <email-filter @filtered="setFilter"></email-filter>
                <p class="emails-read inline" v-if="emails">Emails read: {{emailsRead}}/{{emails.length}}</p>
            </div>
            <email-preview v-if="emailsToShow.length > 0" v-for="email in emailsToShow" @starred="updateStarred" :key="email.id" :email="email"></email-preview>
        </section>
    `,
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        },
        updateStarred(emailId, newVal) {
            emailService.updateProp(emailId, newVal)
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            let regex = new RegExp(`${this.filterBy.txt}`, 'i');
            let newEmails = this.emails.filter(email => {
                let optionsFilter = this.filterBy.options;

                return (regex.test(email.body) || regex.test(email.subject)) &&
                    (optionsFilter === 'read' && email.isRead ||
                        optionsFilter === 'unread' && !email.isRead ||
                        optionsFilter === 'starred' && email.isStarred ||
                        optionsFilter === 'sent' && email.isSentByMe ||
                        optionsFilter === 'all');

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
                eventBus.$emit('emails', emails);
            });
        emailService.countReadEmails()
            .then(res => {
                this.emailsRead = res;
                eventBus.$emit('read-emails', res);
            });
    }
}