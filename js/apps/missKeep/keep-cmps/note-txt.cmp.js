
export default {
  name:'txt-note',
    template: `
          <section class="note-card">
          <label>{{info.createdAt}}</label>
              <p>
                {{info.txt}}
              </p>
          </section>
          `,
    props: ["info"],
    created(){
      console.log('txt-note created');
    }
};