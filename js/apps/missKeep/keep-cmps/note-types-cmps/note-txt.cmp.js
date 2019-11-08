import { keepService } from '../../keep-services/keep-service.js';
import { eventBus } from '../../../../services/eventbus-service.js';



export default {
	name: 'txt-note',
	template: `
      <section class="note-card" 
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:style="activeColor"
	  >
	  	
        <p>{{note.info.txt}}</p>

		<template v-if="hover">
			<i class="fas fa-font"></i>
			<i @click="removeNote(note.id)" class="fas fa-trash-alt"></i>
			<i class="fas fa-fill" @click="colorSelect = !colorSelect"></i>

			<ul v-if="colorSelect" class="clean-list flex">
				<li><i class="fas fa-tint" style='color:blue' @click="changeColor('blue')"></i></li>
				<li><i class="fas fa-tint" style='color:yellow' @click="changeColor('yellow')"></i></li>
				<li><i class="fas fa-tint" style='color:red' @click="changeColor('red')"></i></li>
				<li><i class="fas fa-tint" style='color:green' @click="changeColor('green')"></i></li>
			</ul>

		</template>


      </section>
      `,
	props: ['note'],
	data() {
		return {
			hover: false,
			colorSelect: false,
		}
	},
	computed: {
		activeColor() {
			return {
				backgroundColor: this.note.info.style.backgroundColor
			}
		}
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
		changeColor(color) {
			var noteId = this.note.id;
			keepService.getNoteById(noteId).then(
				note => {
					note.info.style.backgroundColor = color;
					keepService.saveNote(note)
						.then(() => {
							const msg = {
								txt: `Note Color Changed Succefully (${noteId})`,
								type: 'success'
							}
							eventBus.$emit('show-msg', msg);
						})
				}
			)
		}
	}
};