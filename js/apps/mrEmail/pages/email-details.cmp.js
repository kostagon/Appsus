import {
    emailService
} from '../services/email.service.js';
import {
    eventBus
} from '../../../services/eventbus-service.js';

import {keepService} from '../../missKeep/keep-services/keep-service.js';

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
                <div class="flex">
                    <router-link class="self-center" :to="'/email/compose/'+email.id"><button ><i class="fab fa-replyd"></i></button></router-link> &nbsp;
                    <button @click.once="saveAsNote(email)" class="self-center"><i class="fa fa-sticky-note"></i></button> &nbsp;
                    <button @click="removeEmail(email.id)" class="self-center del-btn"><i class="fa fa-trash"></i></button>
                </div>
                
            </div>
            <div class="email-content flex column align-start">
                <p class="date">{{createdTimeToStr}}</p>
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
                    const msg = {
                        txt: `Email deleted successfully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        },
        saveAsNote(email) {
            let note = keepService.createNote('noteTxt', email.body);
            keepService.saveNote(note)
                .then(()=>{
                    const msg = {
                        txt: `Note Added Succefully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
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
            if (hour < 10) hour = `0${hour}`
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