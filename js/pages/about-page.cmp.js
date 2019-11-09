'use strict';

export default {
    name: 'about-page',
    template: `
        <section class="about-page-container">
            <h1>About us!</h1>
            <pre class="about-us">
We are Kosta & Dotan,
we created this site
for Coding Academy's 3rd
sprint project with VueJS.
            </pre>
            <div class="git-links">
                <a class="git-link1" href="https://github.com/kostagon/">Kosta's Github</a> |
                <a class="git-link2" href="https://github.com/DotanSharaby/">Dotan's Github</a>
            </div>
        
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