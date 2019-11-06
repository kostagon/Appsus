export default {
    props: ['email'],
    name: 'email-preview',
    template: `
            <router-link :to="emailDetailsLink" v-bind:class="classObject">
            <section class="email-preview-container flex align-center space-around gap">
                <p>Subject: {{email.subject}}</p>
                <p>Mail body: {{email.body}}</p>
                <p>Sent at: {{createdTimeToStr}}</p>
            </section>
        </router-link>
    `,
    computed: {
        createdTimeToStr() {
            let date = new Date(this.email.sentAt);
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if (minutes < 10) minutes = `0${minutes}`;
            return `${day}/${month}/${year} at ${hour}:${minutes}`;
        },
        isRead() {
            return this.email.isRead
        },
        emailDetailsLink() {
            return `/email/${this.email.id}`
        },
        classObject() {
            return {
                'isBold': this.email.isRead
            }
        }
    }
}