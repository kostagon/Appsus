
export default {
  name: 'todos-note',
  template: `
          <section class="note-card">
          <label>{{info.createdAt}}</label>
              <ul class="clean-list">
                <li v-for="todo in info.todos">{{todo}}</li>
              </ul>
          </section>
          `,
  props: ["info"],
  data() {
    return {
      todos:[]
    }
  },
  created() {
    console.log('todos-note created');
  }
};