'use strict';

export default {
    name: 'book-filter',
    template: `
    <section class="book-filter-container flex justify-center align-center">
        
        <form @submit.prevent="onFilter">
        <h2>Filter: </h2>
            Name:
            <input type="text" placeholder="Book Name" v-model="filterBy.byName" />
            Price from: 
            <input class="number-input" type="number" v-model.number="filterBy.fromPrice" />
            to: 
            <input class="number-input" type="number" v-model.number="filterBy.toPrice" />
            <button>Filter</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {byName: '', fromPrice: 0, toPrice: 10000}
        }
    },
    methods: {
        onFilter() {
            let filter = {...this.filterBy};
            this.$emit('filtered', filter);
        }
    }
}