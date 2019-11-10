export default {
    props: ['email'],
    name: 'email-preview',
    template: `
         <router-link exact :to="emailDetailsLink" :class="classObject">
            <section class="email-preview-container flex align-center space-around">
                
                <div>
                    <p class="inline star-btn" @click.prevent="toggleStarred">{{isStarred}}</p>
                    <p class="inline">{{email.from}}</p>
                </div>
                <div>
                    <p v-if="isLongTxt">{{isLongTxt}}</p>
                    <p v-else>{{email.subject}}</p>
                </div>
                <div>
                    <p class="inline">{{createdTimeToStr}}</p>
                </div>
                <label>Mark as read: </label><input style="width: 20px; height: 20px;" @click.stop="toggleRead" type="checkbox" />
            </section>
        </router-link>
    `,
    methods: {
        toggleStarred() {
            this.email.isStarred = !this.email.isStarred;
            this.$emit('starred', this.email.id, this.email.isStarred);
        },
        toggleRead() {
            this.email.isRead = !this.email.isRead;
            this.$emit('starred', this.email.id, this.email.isRead);
        }
    },
    computed: {
        createdTimeToStr() {
            let date = new Date(this.email.createdAt);
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if (minutes < 10) minutes = `0${minutes}`;
            return `${day}/${month}/${year} at ${hour}:${minutes}`;
        },
        isStarred() {
            if (this.email.isStarred) return '★';
            else return '☆';
        },
        emailDetailsLink() {
            return `/email/${this.email.id}`;
        },
        classObject() {
            return {
                'isRead': this.email.isRead
            }
        },
        isLongTxt() {
            if (this.email.subject.length > 30){
                return this.email.subject.substring(0, 30) + ' ...'
            }
        }
    }
}