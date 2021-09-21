<template>
  <div class="container">
	<div class="row">
    <home-card></home-card>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeCard from "@/components/HomeCard.vue";

export default {
  name: "Home",
  components: {
    HomeCard,
  },
};
</script>
