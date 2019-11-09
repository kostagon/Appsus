import { keepService } from '../../keep-services/keep-service.js';
import { eventBus } from '../../../../services/eventbus-service.js';
import noteEdit from '../note-edit.cmp.js';


export default {
    name: 'todos-note',
    template: `
    <section class="note-card flex column" 
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:style="activeColor"
	>
      
        <ul class="clean-list todos-container">

        <li v-for="(todo,idx) in note.info.todos" 
            :class="{isMarked:todo.isMarked}" 
            @click="toggleMarked(note.id,idx)">
          {{todo.txt}}
          
        </li>
        </ul>
        <div class="editBar flex space-around">
            <i class="fas fa-list"></i>
            <template v-if="hover">
            
                    <i class="fas fa-fill" @click="colorSelect = !colorSelect"></i>

                    <ul v-if="colorSelect" class="clean-list flex space-around">
                        <li><i class="fas fa-tint" style='color:blue' @click="changeColor('blue')"></i></li>
                        <li><i class="fas fa-tint" style='color:yellow' @click="changeColor('yellow')"></i></li>
                        <li><i class="fas fa-tint" style='color:red' @click="changeColor('red')"></i></li>
                        <li><i class="fas fa-tint" style='color:green' @click="changeColor('green')"></i></li>
                    </ul>
                    <i class="fas fa-edit" @click="editMode = !editMode"></i>

                    
    
                    <i @click="removeNote(note.id)" class="fas fa-trash-alt"></i>
                </template>
                <note-edit v-if="editMode" :note="note" @cancel="cancelEditMode" @save="saveNote"></note-edit>
        </div>
    </section>
          `,
    props: ['note'],
    data() {
        return {
            todos: [],
            hover: false,
            colorSelect: false,
            editMode: false
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
        toggleMarked(noteId, idx) {
            var isMarked = this.note.info.todos[idx].isMarked
            isMarked = !isMarked;
            keepService.getNoteById(noteId).then(
                note => {
                    this.note.info.todos[idx].isMarked = isMarked
                    keepService.saveNote(note)
                        .then(() => {
                            const msg = {
                                txt: `Todo Changed Succefully (${noteId})`,
                                type: 'success'
                            }
                            eventBus.$emit('show-msg', msg);
                        })
                }
            )
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
        },
        cancelEditMode(){
            this.editMode = false;
        },
        saveNote(newInfo){
            this.editMode = false;
            keepService.editNote(this.note,newInfo);
        }
    },
    components: {
        noteEdit
    }
};