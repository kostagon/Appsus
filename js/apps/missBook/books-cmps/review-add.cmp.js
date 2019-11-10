'use strict';

export default {
    name: 'review-add',
    template: `
    <section class="review-add-container flex align-center space-around">
        <h2>Add Review</h2>
        <form @submit.prevent="onSubmit" class="flex wrap align-center space-around">
            <div>
                Full Name:
                <input ref="inputName" type="text" v-model="review.name" />
            </div>
            <div class="rate flex align-center space-around">
                Rate:
                <button @click.prevent="updateRate(i)" @mouseover="updateRate(i)" v-for="(i) in 5" :class="{marked: review.rate > i-1}" class="rate-btn">☆</button> 
            </div>
            <div>
                Read at:
                <input class="date-input" type="date" v-model="review.readAt"/>
            </div>
            <div class="flex align-center justify-center">
                Review:
                <textarea v-model.number="review.txt"></textarea>
                <button type="submit">Send</button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            review: {
                name: 'Books Reader', 
                rate: 0, 
                readAt: null,
                txt:'Good book!'
            },
            defaultDate: null
        }
    },
    methods: {
        onSubmit() {
            let review = {...this.review};
            this.$emit('reviewed', review);
            this.review = {name: 'Books Reader', rate: 0, readAt: this.defaultDate, txt:'Good book!'}
        },
        updateRate(rate) {
            this.review.rate = rate;
        }
    },
    mounted() {
        this.$refs.inputName.focus();
    },
    created() {
        var currDate = new Date();
        var year = currDate.getFullYear()
        var month = currDate.getMonth() + 1
        if (month < 10) month = `0${month}`
        var day = currDate.getDate()
        if (day < 10) day = `0${day}`
        this.defaultDate = `${year}-${month}-${day}`
        this.review.readAt = this.defaultDate
    }
}