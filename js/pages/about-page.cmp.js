'use strict';

export default {
    name: 'about-page',
    template: `
        <section class="about-page-container text-center flex space-around align-center">
            <img src="https://www.collegechoice.net/wp-content/uploads/2018/10/Best-Online-Master_s-in-Reading-and-Literacy.jpg"/>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ipsa minus nam alias dolores amet ea at excepturi aut voluptate, officia magni reprehenderit qui eum fugiat molestiae laboriosam laborum facilis.</div>
        </section>
    `,
    data() {
        return {
            aboutInterval: null
        }
    },
    created() {
        // this.aboutInterval = setInterval(() => console.log('Reading the about page...'), 1000);
    },
    destroyed() {
        clearInterval(this.aboutInterval)
    }
}


