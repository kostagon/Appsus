export default {
    name: 'email-sort',
    data(){
        return {
            sortBy: 'new'
        }
    },
    template: `
        <form>
            <label>Sort by:</label>
            <select @change="onSort" class="p7" v-model="sortBy">
                <option value="new">New</option>
                <option value="name">Name</option>
            </select>
        </form>
    `,
    methods: {
        onSort() {
            let sort = this.sortBy;
            this.$emit('sorted', sort);
        }
    }
}