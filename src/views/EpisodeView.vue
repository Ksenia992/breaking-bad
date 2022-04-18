<template>
  <div v-if="cardInfo">
    <div class="d-flex justify-end">
      <router-link to="/rating" style="text-decoration: none; color: inherit">
        <v-btn class="mt-4 mr-2" dark depressed elevation="2" rounded
          >Top-5 episodes <v-icon color="red">mdi-water</v-icon>
        </v-btn>
      </router-link>
    </div>
    <h2>Characters of the episode:</h2>
    <div class="d-flex justify-center">
      <Loader v-if="loading" />
    </div>
    <div
      class="character"
      v-for="character in characters"
      :key="character.name"
    >
      <CharacterCard :characterName="character" />
    </div>
    <v-row>
      <v-col cols="12" md="3">
        <p class="font-italic pt-2">Episode date: {{ cardInfo.air_date }}</p>
        <v-select
          v-model="city"
          @change="showEpisodeWeather"
          :items="cities"
          label="Show the weather in current date"
        ></v-select>
        <div v-if="weather && weather.length">
          <p class="itemStart">{{ getFilteredWeather.weather_state_name }}</p>
          <p>
            <span class="itemStart">Temperature:</span>
            {{ getFilteredWeather.the_temp }}
          </p>
          <p>
            <span class="itemStart">Air pressure:</span>
            {{ getFilteredWeather.air_pressure }}
          </p>
          <p>
            <span class="itemStart">Humidity:</span>
            {{ getFilteredWeather.humidity }}
          </p>
        </div>
        <p v-if="requestHappened && !weather.length">
          There is no data on server for this date
          <v-icon>mdi-alert</v-icon>
        </p>
      </v-col>
    </v-row>
    <h2 v-if="episodeDeathInfo && episodeDeathInfo.length">
      Deaths of the episode:
    </h2>
    <div v-for="item in episodeDeathInfo" :key="item.death_id">
      <p><span class="itemStart">Person:</span> {{ item.death }}</p>
      <p><span class="itemStart">Cause:</span> {{ item.cause }}</p>
      <p><span class="itemStart">Last words:</span> {{ item.last_words }}</p>
    </div>
  </div>
  <h2 v-else>No data</h2>
</template>

<script>
import CharacterCard from "@/components/CharacterCard";
import Loader from "@/components/Loader";
export default {
  name: "CharactersView",
  components: { CharacterCard, Loader },
  data: () => ({
    cardInfo: [],
    characters: [],
    deaths: [],
    isModalOpen: false,
    requestHappened: false,
    cities: ["Albuquerque", "London"],
    cityInfo: null,
    city: "",
    cityId: null,
    weather: null,
    loading: false,
  }),
  methods: {
    async getDeaths() {
      try {
        this.loading = true;
        const res = await fetch("https://www.breakingbadapi.com/api/deaths");
        this.deaths = await res.json();
        this.loading = false;
        localStorage.setItem("deaths", JSON.stringify(this.deaths));
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async getCityId() {
      try {
        this.loading = true;
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.city.toLowerCase()}`
        );
        let data = await res.json();
        this.loading = false;
        [this.cityInfo] = [...data];
        this.cityId = this.cityInfo.woeid;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async showEpisodeWeather() {
      try {
        this.loading = true;
        await this.getCityId();
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${
            this.cityId
          }/${this.formatDateForRequest(this.cardInfo.air_date)}/`
        );
        this.weather = await res.json();
        this.loading = false;
        this.requestHappened = true;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    formatDateForRequest(episodeDate) {
      let date = new Date(episodeDate),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("/");
    },
    formatDateForFilter(episodeDate) {
      let date = new Date(episodeDate),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    // handleClick(deaths) {
    //   this.$router.push({
    //     name: "rating",
    //     params: { deaths },
    //   });
    // },
    // better with LocalStorage
  },
  computed: {
    episodeDeathInfo: function () {
      return this.deaths.filter(
        (death) =>
          death.episode.toString() === this.cardInfo.episode &&
          death.season.toString() === this.cardInfo.season
      );
    },
    getFilteredWeather: function () {
      return this?.weather?.find(
        (item) =>
          item.applicable_date ===
          this.formatDateForFilter(this.cardInfo.air_date)
      );
    },
  },
  mounted() {
    this.cardInfo = JSON.parse(localStorage.getItem("cardInfo"));
    this.characters = this.cardInfo.characters;
    this.getDeaths();
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
.itemStart {
  color: orange;
}
.character :hover {
  text-decoration: underline;
}
</style>
