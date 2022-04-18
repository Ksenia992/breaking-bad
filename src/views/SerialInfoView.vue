<template>
  <v-row class="align-center">
    <v-col cols="12" md="5">
      <Loader v-if="loading" />
      <h1>All info:</h1>
      <p><span>Serial title:</span> {{ serialInfo.Title }}</p>
      <p><span>Main actors:</span> {{ serialInfo.Actors }}</p>
      <p><span>Writer:</span> {{ serialInfo.Writer }}</p>
      <p><span>Genre:</span> {{ serialInfo.Genre }}</p>
      <p><span>Country:</span> {{ serialInfo.Country }}</p>
      <p><span>Released:</span> {{ serialInfo.Released }}</p>
      <p><span>Years:</span> {{ serialInfo.Year }}</p>
      <p><span>Rating:</span> {{ serialInfo.imdbRating }}</p>
      <p><span>Awards:</span> {{ serialInfo.Awards }}</p>
      <p><span>Total seasons:</span> {{ serialInfo.totalSeasons }}</p>
      <p><span>Plot:</span> {{ serialInfo.Plot }}</p>
    </v-col>
    <v-col cols="12" md="7">
      <img :src="serialInfo.Poster" alt="poster"
    /></v-col>
  </v-row>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "SerialInfoView",
  components: { Loader },
  data: () => ({
    serialInfo: [],
    loading: false,
  }),
  methods: {
    async getSerialInfo() {
      try {
        this.loading = true;
        const res = await fetch(
          "http://www.omdbapi.com/?apikey=88e836ce&i=tt0903747"
        );
        this.serialInfo = await res.json();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
  mounted() {
    this.getSerialInfo();
  },
};
</script>

<style scoped>
h1 {
  color: purple;
}
span {
  color: green;
}
</style>
