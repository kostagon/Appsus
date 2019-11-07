import { keepService } from '../keep-services/keep-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
  name: 'todos-note',
  template: `
    <section class="note-card">
      <i @click="removeNote(info.id)" class="fas fa-trash-alt"></i>
      <ul class="clean-list">


        <li v-for="todo in info.todos"
          :class="classObject"
        @click.prevent="toggleTodo(todo)">

        {{todo.txt}}</li>
        

      </ul>
      <label>{{info.createdAt}}</label>
    </section>
          `,
  props: ["info"],
  data() {
    return {
      todos: [],
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
    }
  },
  computed: {
    classObject() {
      // return { 'isMarked': todo.isMarked }
    }
  }
};