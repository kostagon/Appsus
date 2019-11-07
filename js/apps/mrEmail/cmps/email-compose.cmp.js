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
        <section class="email-compose-container cmp-main-container">
            <form class="flex column">
                <h2 class="copose-header self-start gap">New email</h2>
                <input v-model="newMail.subject" type="text" class="email-msg p7" placeholder="Subject">
                <textarea v-model="newMail.body" class="body-msg p7" placeholder="Body"></textarea>
                <div class="flex space-between">
                    <router-link to="/email"><button @click="composeEmail" class="p7 gap">Send</button></router-link>
                    <button class="p7 gap">Trash</button>
                </div>
            </form>
        </section>
    `,
    methods: {
        composeEmail() {
            if(!this.dataIsValid) return;
            emailService.saveEmailAndStore(this.newMail.subject, this.newMail.body);
        }
    },
    computed: {
        dataIsValid() {
            return !!this.newMail.subject && !!this.newMail.body;
        }
    }
}