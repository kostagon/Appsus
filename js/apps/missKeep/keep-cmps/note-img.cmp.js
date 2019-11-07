import { keepService } from '../keep-services/keep-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
  name: 'img-note',
  template: `
      <section class="note-card">
        <i @click="removeNote(info.id)" class="fas fa-trash-alt"></i>
        <img :src="info.imgUrl" />
        <label>{{info.createdAt}}</label>
      </section>
          `,
  props: ["info"],
  created() {
    // console.log('img-note created');
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
    }
  }
}