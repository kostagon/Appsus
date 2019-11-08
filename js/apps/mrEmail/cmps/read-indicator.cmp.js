import {
    eventBus
} from '../../../services/eventbus-service.js';

export default {
    name: 'read-indicator',
    data() {
        return {
            emailsAmount: null,
            readEmailsAmount: null
        }
    },
    template: `
            <span v-show="emailsAmount" class="float-right">{{readEmailsAmount}}/{{emailsAmount}}</span>
    `,
    created() {
        eventBus.$on('emails', emails => {
            this.emailsAmount = emails.length;
        });
        eventBus.$on('read-emails', res => {
            this.readEmailsAmount = res;
        })
    }
}