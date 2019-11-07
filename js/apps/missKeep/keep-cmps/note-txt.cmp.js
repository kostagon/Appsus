import { keepService } from '../keep-services/keep-service.js';
import { eventBus } from '../../../services/eventbus-service.js';



export default {
	name: 'txt-note',
	template: `
      <section class="note-card" 
      @mouseover="hover = true"
	  @mouseleave="hover = false"
	  :style="{ backgroundColor:activeColor}"
	  >
	  	<i @click="removeNote(info.id)" class="fas fa-trash-alt"></i>
        
        <p>{{info.txt}}</p>
        <label>{{info.createdAt}}</label>

        <template v-if="hover"><i class="fas fa-fill" @click="changeColor(info.id)"></i></template>


      </section>
      `,
	props: ["info"],
	data() {
		return {
			hover: false,
			activeColor: this.info.style.bgc
		}
	},
	created(){
		// console.log(this.activeColor);
	},
	methods: {
		removeNote(noteId) {
			keepService.removeNote(noteId)
				.then(() => {
					const msg = {
						txt: `Note Deleted Succefully (${noteId})`,
						type: 'success'
					}
					eventBus.$emit('show-msg', msg);
				})
		},
		changeColor(noteId) {

			// keepService.getNotes(noteId).then(
			// 	note => {
			// 		keepService.saveNote(note)
			// 			.then(() => {
			// 				const msg = {
			// 					txt: `Note Deleted Succefully (${noteId})`,
			// 					type: 'success'
			// 				}
			// 				eventBus.$emit('show-msg', msg);
			// 			})
			// 	}
			// )

		}
	}
};