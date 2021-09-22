<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                
                <h4 class="modal-title">Edit Your Review</h4>
              </div>
              <div class="modal-body">
                <form>
          <div class="form-group">
            <div class="rating"> <input type="radio" v-model="rating" name="rating" value="5" id="5"><label for="5">☆</label> <input v-model="rating" type="radio" name="rating" value="4" id="4"><label for="4">☆</label> <input v-model="rating" type="radio" name="rating" value="3" id="3"><label for="3">☆</label> <input v-model="rating" type="radio" name="rating" value="2" id="2"><label for="2">☆</label> <input v-model="rating" type="radio" name="rating" value="1" id="1"><label for="1">☆</label> </div>
            <div class="comment-area"> <input v-model="title" class="form-control" type="text" placeholder="Your review title"  > <br> <textarea v-model="content" class="form-control" placeholder="what's your view about this film?" rows="4" ></textarea> </div>
          </div>
          </form>
              </div>
               <div class="modal-footer">
        <button @click="$emit(`close`)" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="$emit(`close`); submitEdit();"  type="button" class="btn btn-primary">submit</button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: `EditModal`,
  props: [`review`],
  data(){
    return {
      title: this.review.title,
      content: this.review.content,
      rating: this.review.rating,
      id: this.review.id
    }
  },
  methods: {
    submitEdit(){
      console.log(`masuk`);
      let payload =  {
        title: this.title,
        content: this.content,
        rating: this.rating,
        id: this.id
      }

      this.$store.dispatch(`editReview`, payload)
    }
  }
}
</script>

<style >
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.rating {
    display: flex;
    margin-top: -10px;
    flex-direction: row-reverse;
    margin-left: -4px;
    float: left
}

.rating>input {
    display: none
}

.rating>label {
    position: relative;
    width: 19px;
    font-size: 25px;
    color: orange;
    cursor: pointer
}

.rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0
}

.rating>label:hover:before,
.rating>label:hover~label:before {
    opacity: 1 !important
}

.rating>input:checked~label:before {
    opacity: 1
}

.rating:hover>input:checked~label:before {
    opacity: 0.4
}
</style>