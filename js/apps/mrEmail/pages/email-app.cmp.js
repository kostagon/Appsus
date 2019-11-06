
import sideBar from '../cmps/side-bar.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailAdd from '../cmps/email-add.cmp.js';

export default {
    template: `
        <section class="email-app-container container">
            <h1>Email app page</h1>
            <side-bar></side-bar>
            <email-list></email-list>
            <email-add></email-add>
        </section>
    `,
    components: {
        sideBar,
        emailList,
        emailAdd
    }
}