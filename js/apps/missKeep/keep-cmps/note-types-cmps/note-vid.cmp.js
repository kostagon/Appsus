import { keepService } from '../../keep-services/keep-service.js';
import { eventBus } from '../../../../services/eventbus-service.js';
import noteEdit from '../note-edit.cmp.js';

export default {
    name: 'vid-note',
    template: `
    <section class="note-card flex column" 
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :style="activeColor"
    >

        <iframe :src="getVidUrl" frameborder="0" allowfullscreen></iframe>

        <div class="editBar flex column space-around">

            <note-edit v-if="editMode" :note="note" @cancel="cancelEditMode" @save="saveNote"></note-edit>
            
            <div class="icons-container flex space-around">
                <i class="fas fa-video"></i>
                <template v-if="hover">

                    <i class="fas fa-thumbtack" :class="{ pinned:note.info.isPinned }" @click="togglePinned"></i>
                    <router-link :to="'/email/compose/' + stringifyURL">
                        <i class="far fa-paper-plane"></i>
                    </router-link>

                    <i class="fas fa-fill" @click="colorSelect = !colorSelect"></i>

                    <ul v-if="colorSelect" class="clean-list flex space-around color-container">
                        <li><i class="fas fa-tint" style='color:#7d4e2d' @click="changeColor('#7d4e2d')"></i></li>
                        <li><i class="fas fa-tint" style='color:#004e8c' @click="changeColor('#004e8c')"></i></li>
                        <li><i class="fas fa-tint" style='color:#9c271f' @click="changeColor('#9c271f')"></i></li>
                        <li><i class="fas fa-tint" style='color:#79028e' @click="changeColor('#79028e')"></i></li>
                        <li><i class="fas fa-tint" style='color:#d4be00' @click="changeColor('#d4be00')"></i></li>
                        <li><i class="fas fa-tint" style='color:#005800' @click="changeColor('#005800')"></i></li>
                    </ul>
                    <i class="fas fa-edit" @click="toggleEditMode"></i>

                    <i @click="removeNote(note.id)" class="fas fa-trash-alt"></i>
                </template>
            </div>
        </div>
    </section>
          `,
    props: ['note'],
    data() {
        return {
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
        },
        getVidUrl(){
            var url = this.note.info.vidUrl;
            return keepService.getVidUrl(url);
        },
        stringifyURL() {
            var data = this.note.info.vidUrl;
            var url = encodeURIComponent(JSON.stringify(data));
            return url;
        }
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
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
        }
    },
    components: {
        noteEdit
    }
}