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
        <section>
            <form  class="flex column box-shadow gap">
                <h2 class="copose-header self-start gap">New email</h2>
                <input v-model="newMail.subject" type="text" class="p7 gap" placeholder="Subject">
                <textarea v-model="newMail.body" class="body-msg p7 gap" placeholder="Body"></textarea>
                <div class="flex space-between">
                    <button @click="composeEmail" class="gap p7">Send</button>
                    <button class="gap p7">Trash</button>
                </div>
            </form>
        </section>
    `,
    methods: {
        composeEmail() {
            if(!this.dataIsValid) return;
            emailService.saveEmailAndStore(this.newMail.subject, this.newMail.body)
        }
    },
    computed: {
        dataIsValid() {
            return !!this.newMail.subject && !!this.newMail.body;
        }
    }
}