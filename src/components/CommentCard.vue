<template>
  <div class="card p-3">
                <div class="user d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <span><small class="font-weight-bold text-primary">{{review.User.username}}</small> </span> </div> 
                </div>
                <div class="user d-flex justify-content-between align-items-center">
                  <h6>{{review.title}}</h6>
                  </div>
                  <div class="user d-flex justify-content-between align-items-center">
                  <small class="comment">{{review.content}}</small>
                  </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <span class="dots"></span> <small @click="showModal = true">Edit</small> <span class="dots"></span>   <small @click="deletePost(review.id)">Remove</small> <span class="dots"></span></div>
                    <div class="icons align-items-center"> <i v-for="num in review.rating" :key="num" class="fa fa-star text-warning"></i> <i class="fa fa-check-circle-o check-icon"></i> </div>
                </div>
                
                  <div v-if="showModal">
                    <edit-modal @close="close" :review="review"></edit-modal>
                  </div>
                </div>
            
</template>

<script>
import EditModal from "@/components/EditModal.vue"

export default {
  name: `CommentCard`,
  props: [`review`],
  components: {
    EditModal
  },
  data(){
    return {
      showModal: false
    }
  },
  methods: {
    deletePost(id){
      let payload = {
        id: id,
        MovieId: this.$route.params.MovieId
      }
      this.$store.dispatch(`deleteReview`, payload)
    },
    edit(review){
      // console.log(review);
      this.$store.commit(`SELECTED_COMMENT`, review)
    },
    close(){
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.card {
    border: none;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    border-radius: 4px
}

.dots {
    height: 4px;
    width: 4px;
    margin-bottom: 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block
}

.badge {
    padding: 7px;
    padding-right: 9px;
    padding-left: 16px;
    box-shadow: 5px 6px 6px 2px #e9ecef
}
.user {
  margin-left: 20px
}

h6 {
  margin-left: 20px
}

.comment {
  margin-left: 20px
}


.user-img {
    margin-top: 4px
}

.check-icon {
    font-size: 17px;
    color: #c3bfbf;
    top: 1px;
    position: relative;
    margin-left: 3px
}

.form-check-input {
    margin-top: 6px;
    margin-left: -24px !important;
    cursor: pointer
}

.form-check-input:focus {
    box-shadow: none
}

.icons i {
    margin-left: 8px
}

.reply {
    margin-left: 12px
}

.reply small {
    color: #b7b4b4
}

.reply small:hover {
    color: green;
    cursor: pointer
}
</style>