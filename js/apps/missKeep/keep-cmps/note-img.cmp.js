
export default {
  name:'img-note',
    template: `
          <section class="note-card">
            <label>{{info.createdAt}}</label>
            <img :src="info.imgUrl" />
          </section>
          `,
    props: ["info"],
    created(){
      console.log('img-note created');
    }
};