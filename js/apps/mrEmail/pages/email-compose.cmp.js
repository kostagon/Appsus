import {
    emailService
} from '../services/email.service.js';

export default {
    name: 'email-compose',
    data() {
        return {
            newMail: emailService.getEmptyEmail()
        }
    },
    template: `
        <section class="email-compose-container">
            <form class="flex column">
                <h2 class="compose-header self-start gap">New email</h2>
                <input v-model="newMail.from" type="text" class="email-msg p7" placeholder="From">
                <input v-model="newMail.subject" type="text" class="email-msg p7" placeholder="Subject">
                <textarea v-model="newMail.body" class="body-msg p7" placeholder="Body"></textarea>
                <div class="flex space-between">
                    <router-link to="/email"><button @click="composeEmail" class="p7 gap">Send</button></router-link>
                </div>
            </form>
        </section>
    `,
    methods: {
        composeEmail() {
            if(!this.dataIsValid) return;
            emailService.saveEmailAndStore(this.newMail.subject, this.newMail.body, this.newMail.from);
        }
    },
    computed: {
        dataIsValid() {
            return !!this.newMail.from && !!this.newMail.subject && !!this.newMail.body;
        }
    }
}