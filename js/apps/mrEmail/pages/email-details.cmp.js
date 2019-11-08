import {
    emailService
} from '../services/email.service.js';


export default {
    name: 'email-details',
    data() {
        return {
            email: null
        }
    },
    template: `
        <section v-if="email" class="email-details-container">

            <div class="email-header flex space-between">
                <h3>From: <span class="underline">{{email.from}}</span></h3>
                <button @click="removeEmail(email.id)" class="self-center">X</button>
            </div>
            <div class="email-content flex column align-start">
                <p class="date float-right-margin underline self-end">{{createdTimeToStr}}</p>
                <h2><span class="underline">Subject:</span> {{email.subject}}</h2>
                <p>{{email.body}}</p>
            </div>
        </section>
    `,
    methods: {
        loadMail() {
            const emailId = this.$route.params.id;
            emailService.getEmailById(emailId)
                .then(email => {
                    email.isRead = true;
                    emailService.updateProp(email.id, email.isRead)
                    this.email = email;
                })
        },
        removeEmail(id) {
            emailService.removeEmail(id)
                .then(() => {
                    this.$router.push('/email');
                })
        }
    },
    computed: {
        createdTimeToStr() {
            let date = new Date(this.email.createdAt);
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let hour = date.getHours();
            if (hour < 10) hours = `0${hour}`
            let minutes = date.getMinutes();
            if (minutes < 10) minutes = `0${minutes}`
            return `${day}/${month}/${year} at ${hour}:${minutes}`;
        },
        isRead() {
            return this.email.isRead
        }
    },
    created() {
        this.loadMail();
    }
}