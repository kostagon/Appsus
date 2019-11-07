export default {
    name: 'email-filter',
    data(){
        return {
            filterBy: {
                txt: '',
                read: 'all'
            }
        }
    },
    template: `
        <form>
            <label>Filter by:</label>
            <input @input="onFilter" class="p7 text-center" v-model="filterBy.txt" type="text" placeholder="Text" />
            <select @change="onFilter" class="p7" v-model="filterBy.read">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    `,
    methods: {
        onFilter() {
            let filter = {...this.filterBy};
            this.$emit('filtered', filter);
        }
    }
}