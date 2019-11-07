import '../services/util.service.js';

export default {
    name: 'side-bar',
    template: `
        <section class="email-side-bar">
            <router-link :to="emailComposeLink"><div class="compose-btn flex justify-center align-center"><span class="plus-btn">+</span>Compose</div></router-link>
            <div class="side-bar-item">Inbox</div>
            <div class="side-bar-item">Starred</div>
            <div class="side-bar-item">Sent Mail</div>
            <div class="side-bar-item">Drafts</div>
        </section>
    `,
    computed: {
        emailComposeLink() {
            return `/email/compose`;
        }
    }
}