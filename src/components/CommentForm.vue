<template>
  <div class="card">
    <div class="row">
        
        <div class="col-12">
            <div class="comment-box ml-2">
                <h4>Add Your Review</h4>
                <div class="rating"> <input type="radio" v-model="rating" name="rating" value="5" id="5"><label for="5">☆</label> <input v-model="rating" type="radio" name="rating" value="4" id="4"><label for="4">☆</label> <input v-model="rating" type="radio" name="rating" value="3" id="3"><label for="3">☆</label> <input v-model="rating" type="radio" name="rating" value="2" id="2"><label for="2">☆</label> <input v-model="rating" type="radio" name="rating" value="1" id="1"><label for="1">☆</label> </div>
                <div class="comment-area"> <input v-model="title" class="form-control" type="text" placeholder="Your review title" > <br> <textarea v-model="content" class="form-control" placeholder="what's your view about this film?" rows="4"></textarea> </div>
                <div class="comment-btns mt-2">
                    <div class="row">
                        <div class="justify-content-center">
                            <div class="pull-right"> <button @click="submitReview" class="btn btn-success send btn-sm">Send <i class="fa fa-long-arrow-right ml-1"></i></button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: `CommentForm`,

  data(){
    return {
      title: "",
      content: "",
      rating: 0,
      id: this.$route.params.MovieId
    }
  },
  methods: {
    submitReview(){
      let payload = {
      title: this.title,
      content: this.content,
      rating: this.rating,
      id: this.id
      }
      // console.log(this.id);
      
      this.$store.dispatch(`postReview`, payload)
      
      this.title = ""
      this.content = ""
      this.rating = 0
    }
  },
}
</script>

<style scoped>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 20px;
    
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 6px;
    
}

.comment-box {
    padding: 5px
}

.comment-area textarea {
    resize: none;
    border: 1px solid #ad9f9f
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #ffffff;
    outline: 0;
    box-shadow: 0 0 0 1px rgb(255, 0, 0) !important
}

.send {
    color: #fff;
    background-color: #2980b9;
    
}

.send:hover {
    color: #fff;
    background-color: #3498db;
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