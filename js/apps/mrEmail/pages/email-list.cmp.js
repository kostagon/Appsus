import {
    emailService
} from '../services/email.service.js';
import {
    eventBus
} from '../../../services/eventbus-service.js';

import emailPreview from '../cmps/email-preview.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailSort from '../cmps/email-sort.cmp.js';


export default {
    name: 'email-list',
    data() {
        return {
            emails: [],
            emailsRead: 0,
            filterBy: null,
            sortBy: null
        }
    },
    template: `
        <section class="email-list-container">
            <div class="list-header flex space-around align-center">
                <email-filter @filtered="setFilter"></email-filter>
                <email-sort @sorted="setSort"></email-sort>
                <p class="emails-read inline" v-if="emails">Emails read: {{emailsRead}}/{{emails.length}}</p>
            </div>
            <email-preview v-for="email in emailsToShow" @starred="updateStarred" :key="email.id" :email="email"></email-preview>
        </section>
    `,
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        },
        updateStarred(emailId, newVal) {
            emailService.updateProp(emailId, newVal)
        },
        setSort(sort) {
            this.sortBy = sort;
            this.sortEmails;
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
        },
        sortEmails() {
            function byName(a, b) {
                let prop1 = a.from.toUpperCase();
                let prop2 = b.from.toUpperCase();
                if (prop1 < prop2) return -1;
                if (prop1 > prop2) return 1;
                return 0;
            };
            function byDate(a, b){
                let prop1 = a.createdAt;
                let prop2 = b.createdAt;
                return prop2 - prop1;
            }
            if (this.sortBy === 'name') return this.emails.sort(byName);
            if (this.sortBy === 'new') return this.emails.sort(byDate);
        }
    },
    components: {
        emailPreview,
        emailFilter,
        emailSort
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