import { keepService } from '../../keep-services/keep-service.js';
import { eventBus } from '../../../../services/eventbus-service.js';



export default {
	name: 'txt-note',
	template: `
    <section class="note-card flex column" 
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:style="activeColor"
	>
	  	
        <p>{{note.info.txt}}</p>
		<div class="editBar flex space-around">
			<i class="fas fa-font"></i>
			<template v-if="hover">
				<i @click="removeNote(note.id)" class="fas fa-trash-alt"></i>
				<i class="fas fa-fill" @click="colorSelect = !colorSelect"></i>

				<ul v-if="colorSelect" class="clean-list flex space-around">
					<li><i class="fas fa-tint" style='color:blue' @click="changeColor('blue')"></i></li>
					<li><i class="fas fa-tint" style='color:yellow' @click="changeColor('yellow')"></i></li>
					<li><i class="fas fa-tint" style='color:red' @click="changeColor('red')"></i></li>
					<li><i class="fas fa-tint" style='color:green' @click="changeColor('green')"></i></li>
				</ul>

			</template>
		</div>

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