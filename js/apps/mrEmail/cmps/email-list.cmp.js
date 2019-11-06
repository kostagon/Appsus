import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    name: 'email-list',
    template: `
        <section class="email-list-container">
            <h1>Email list</h1>
            <email-preview></email-preview>
        </section>
    `,
    components: {
        emailPreview
    }
}