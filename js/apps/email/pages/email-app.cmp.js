import emailList from '../cmps/email-list.cmp.js';
import sideBar from '../cmps/side-bar.cmp.js';

export default {
    template: `
        <section class="email-app-container">
            <h1>Email app page</h1>
            <side-bar></side-bar>
            <email-list></email-list>
        </section>
    `,
    components: {
        emailList,
        sideBar
    }
}