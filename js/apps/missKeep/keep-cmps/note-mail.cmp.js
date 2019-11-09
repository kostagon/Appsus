export default {
    props: ['note'],
    template: `
		<section class="notes-mail">

			<input type="text" autocomplete="off" placeholder="subject" v-model="newMail.subject" />
			<input type="text" autocomplete="off" placeholder="from" v-model="newMail.from" />
            <input type="text" autocomplete="off" v-model="newMail.info" />
            
			<button @click="cancelEdit">Cancel</button>
			<button @click="saveEdit">Send</button>

		</section>
	`,
    data() {
        return {
            newMail: {
                subject: '',
                from: '',
                info: ''
            }
        }
    },
    created() {
        this.newMail.info = this.getNoteData();
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
            this.$emit('saveMail', this.newMail)
        },
        cancelEdit() {
            this.$emit('cancelMail', false)
        }
    }
}
