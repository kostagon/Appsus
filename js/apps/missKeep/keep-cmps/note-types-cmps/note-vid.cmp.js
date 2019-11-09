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
        

        <div class="video-player">
            <video class="video" ref="video">
                <source :src="note.info.vidUrl" type="video/mp4" />
            </video>
        </div>


        <div class="editBar flex space-around">
            <i class="fas fa-video"></i>
            <template v-if="hover">
                <i class="fas fa-fill" @click="colorSelect = !colorSelect"></i>

                <ul v-if="colorSelect" class="clean-list flex space-around">
                    <li><i class="fas fa-tint" style='color:blue' @click="changeColor('blue')"></i></li>
                    <li><i class="fas fa-tint" style='color:yellow' @click="changeColor('yellow')"></i></li>
                    <li><i class="fas fa-tint" style='color:red' @click="changeColor('red')"></i></li>
                    <li><i class="fas fa-tint" style='color:green' @click="changeColor('green')"></i></li>
                </ul>
                <i class="fas fa-edit" @click="editMode = !editMode"></i>

                <note-edit v-if="editMode" :note="note" @cancel="cancelEditMode" @save="saveNote"></note-edit>

                <i @click="removeNote(note.id)" class="fas fa-trash-alt"></i>
		    </template>
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
    mounted() {
        // this.videoElement.autoplay = true;
        this.videoElement.controls = true;
    },
    computed: {
        activeColor() {
            return {
                backgroundColor: this.note.info.style.backgroundColor
            }
        },
        videoElement() {
            return this.$refs.video;
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