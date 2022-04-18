<template>
  <v-row>
    <v-col>
      <h1 class="text-center font-weight-bold pt-2 headline">Top-5:</h1>
      <v-card
        v-for="item in topFive"
        :key="item.number_of_deaths"
        class="mx-auto my-12 px-2 py-2"
        max-width="374"
      >
        <p>
          <span class="headline">Number of deaths:</span>
          {{ item.number_of_deaths }}
        </p>
        <p><span class="headline">Who:</span> {{ item.death }}</p>
        <p><span class="headline">Responsible:</span> {{ item.responsible }}</p>
        <p><span class="headline">Cause:</span> {{ item.cause }}</p>
        <p><span class="headline">Season:</span> {{ item.season }}</p>
        <p><span class="headline">Episode:</span> {{ item.episode }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RatingInfoView",
  data: () => ({
    rating: [],
  }),
  computed: {
    topFive() {
      return this.rating.slice(0, 5);
    },
  },
  mounted() {
    let deaths = JSON.parse(localStorage.getItem("deaths"));
    this.rating = deaths.sort(
      (item1, item2) => item2.number_of_deaths - item1.number_of_deaths
    );
  },
};
</script>

<style scoped>
.headline {
  color: red;
}
</style>
