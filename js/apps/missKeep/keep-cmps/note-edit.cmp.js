

export default {
    props: ['note'],
    template: `
		<section class="notes-edit">

			<input type="text" autocomplete="off" v-model="newData" />
			<button @click="cancelEdit">Cancel</button>
			<button @click="saveEdit">Update</button>

		</section>
	`,
    data() {
        return {
            newData: '',
        }
    },
    created() {
        this.newData = this.getNoteData();
    },
    methods: {
        getNoteData() {
            let val = '';
            switch (this.note.type) {
                case 'noteTxt':
                    val = this.note.info.txt;
                    break;
                case 'noteImg':
                    val = this.note.info.imgUrl;
                    break;
                case 'noteVid':
                    val = this.note.info.vidUrl;
                    break;
                case 'noteTodo':
                    val = this.note.info.todos.map(todo => todo.txt).join(',');
                    break;
            }
            return val;
        },
        saveEdit() {
            this.$emit('save', this.newData)
        },
        cancelEdit() {
            this.$emit('cancel', false)
        }
    }
}
