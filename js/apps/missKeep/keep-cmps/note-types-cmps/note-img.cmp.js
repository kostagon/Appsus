import { keepService } from '../../keep-services/keep-service.js';
import { eventBus } from '../../../../services/eventbus-service.js';
import noteEdit from '../note-edit.cmp.js';
import { emailService } from '../../../mrEmail/services/email.service.js';
import noteMail from '../note-mail.cmp.js';


export default {
    name: 'img-note',
    template: `
    <section class="note-card flex column" 
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :style="activeColor"
    >
        
        <img :src="note.info.imgUrl" />
        <div class="editBar flex space-around">
            <i class="far fa-image"></i>
            <template v-if="hover">

                <i class="far fa-paper-plane" @click="sendMailMode = !sendMailMode"></i>
                <i class="fas fa-thumbtack" :class="{ pinned:note.info.isPinned }" @click="togglePinned"></i>

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
            <note-mail v-if="sendMailMode" :note="note" @cancelMail="cancelMailMode" @saveMail="sendAsMail"></note-mail>
        </div>
    </section>
          `,
    props: ['note'],
    data() {
        return {
            hover: false,
            colorSelect: false,
            editMode: false,
            sendMailMode: false
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
        togglePinned() {
            this.note.info.isPinned = !this.note.info.isPinned;
            keepService.saveNote(this.note);
        },
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
        },
        cancelEditMode() {
            this.editMode = false;
        },
        saveNote(newInfo) {
            this.editMode = false;
            keepService.editNote(this.note, newInfo);
        },
        sendAsMail(newMail) {
            emailService.saveEmailAndStore(newMail.subject, newMail.info, newMail.from)
        },
        cancelMailMode() {
            this.sendMailMode = false;
        }
    },
    components: {
        noteEdit,
        noteMail
    }
}