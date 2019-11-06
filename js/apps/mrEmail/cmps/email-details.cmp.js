import {
    emailService
} from '../services/email.service.js'
// import {eventBus} from '../services/event-bus.service.js';

export default {
    name: 'email-details',
    data() {
        return {
            email: null
        }
    },
    template: `
        <section v-if="email" class="email-details-container margin-center">
            <button @click="removeEmail(email.id)" class="float-right"> x </button>
            <p>Subject: {{email.subject}} <span v-show="isRead">✓</span></p>
            <p>Mail body: {{email.body}}</p>
            <p>Sent at: {{createdTimeToStr}}</p>
        </section>
    `,
    methods: {
        loadMail() {
            const emailId = this.$route.params.id;
            emailService.getEmailById(emailId)
                .then(email => {
                    email.isRead = true;
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
            let date = new Date(this.email.sentAt);
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
        console.log(this.$route.params.id);
        this.loadMail();
    }
}