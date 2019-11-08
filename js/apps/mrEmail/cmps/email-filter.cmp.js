import {
    eventBus
} from '../../../services/eventbus-service.js';

export default {
    name: 'email-filter',
    data(){
        return {
            filterBy: {
                txt: '',
                options: 'all'
            }
        }
    },
    template: `
        <form>
            <label>Filter by:</label>
            <input @input="onFilter" class="p7 text-center" v-model="filterBy.txt" type="text" placeholder="Text" />
            <select @change="onFilter" class="p7" v-model="filterBy.options">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
                <option value="starred">Starred</option>
            </select>
        </form>
    `,
    methods: {
        onFilter() {
            let filter = {...this.filterBy};
            console.log(filter);
            this.$emit('filtered', filter);
        }
    },
    created() {
        eventBus.$on('show-emails-by', (res) => {
            this.filterBy.options = res;
            this.onFilter();
        });
    }
}