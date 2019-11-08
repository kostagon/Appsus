import '../services/util.service.js';

export default {
    name: 'side-bar',
    template: `
        <section class="email-side-bar">
            <router-link to="/email/compose"><div class="compose-btn flex justify-center align-center"><span class="plus-btn">+</span>Compose</div></router-link>
            <router-link to="/email"><div class="side-bar-item">Inbox</div></router-link>
            <router-link to="/email/starred"><div class="side-bar-item">Starred</div></router-link>
            <router-link to="/email/sent"><div class="side-bar-item">Sent Mails</div></router-link>
        </section>
    `
}