'use strict';

import noteList from '../keep-cmps/note-list.cmp.js';

export default {
    name: 'keep-app',
    template: `
        <section class="keep-app-container">
            <h1>keep app page</h1>
            <note-list></note-list>
        </section>
    `,
    components: {
        noteList
    }
}
