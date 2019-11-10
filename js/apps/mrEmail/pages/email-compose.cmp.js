import {
    emailService
} from '../services/email.service.js';
import {
    eventBus
} from '../../../services/eventbus-service.js';

export default {
    name: 'email-compose',
    data() {
        return {
            newMail: emailService.getEmptyEmail(),
            isReply: false
        }
    },
    template: `
        <section class="email-compose-container">
            <form class="flex column">
                <h2 class="compose-header self-start gap">{{composeTitle}}</h2>
                <input v-model="newMail.from" :disabled="isReply" type="text" class="email-msg p7" placeholder="From">
                <input v-model="newMail.subject" :disabled="isReply" type="text" class="email-msg p7" placeholder="Subject">
                <textarea v-model="newMail.body" class="body-msg p7" placeholder="Body"></textarea>
                <div class="flex space-between">
                    <router-link to="/email"><button @click="composeEmail" class="p7 gap">Send</button></router-link>
                </div>
            </form>
        </section>
    `,
    methods: {
        composeEmail() {
            if (!this.dataIsValid) return;
            emailService.saveEmailAndStore(this.newMail.subject, this.newMail.body, this.newMail.from)
                .then((email) => {
                    const msg = {
                        txt: `Email composed successfully (${email.id})`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                });
        }
    },
    computed: {
        dataIsValid() {
            return !!this.newMail.from && !!this.newMail.subject && !!this.newMail.body;
        },
        composeTitle() {
            return (this.isReply) ? 'Reply: ' : 'Compose email'
        }
    },
    created() {
        let currId = this.$route.params.id;

        if (currId) {
            emailService.getEmailById(currId)
                .then((email) => {
                    if (!email) return
                    this.isReply = true;
                    let strEmail = JSON.stringify(email);
                    let newEmail = JSON.parse(strEmail);
                    newEmail.id = null;
                    newEmail.from = newEmail.from;
                    newEmail.subject = 'Re: ' + newEmail.subject;
                    this.newMail = newEmail;
                })
        }
    },
    mounted() {
        let param = this.$route.params.id;
        param = JSON.parse(param);
        this.newMail.body = param;
    }
}