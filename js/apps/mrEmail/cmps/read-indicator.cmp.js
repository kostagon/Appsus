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
        <template>
            <span class="float-right">{{readEmailsAmount}}/{{emailsAmount}}</p>
        </template>
    `,
    created() {
        eventBus.$on('emails', emails => {
            this.emailsAmount = emails.length;
        });
        eventBus.$on('read-emails', res => {
            this.readEmailsAmount = res;
        })
        console.log(emails);
    }
}