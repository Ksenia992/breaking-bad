<template>
  <div>
    <v-card>
      <v-toolbar dark flat prominent>
        <v-row class="align-baseline mt-2 ml-2">
          <router-link to="/info">
            <v-btn class="mr-2" color="primary" depressed elevation="2" rounded
              >Get serial info</v-btn
            >
          </router-link>
          <v-col cols="12" md="2">
            <v-text-field
              @input="searchEpisodes"
              type="text"
              v-model="search"
              label="Search by title"
            ></v-text-field>
          </v-col>
        </v-row>
        <template v-slot:extension>
          <v-tabs v-model="tabs" centered>
            <v-tab v-for="n in 5" :key="n"> Season {{ n }} </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-if="getSeasonOne">
          <v-card
            v-for="(card, i) in getSeasonOne"
            :key="i"
            class="mx-auto my-12"
            max-width="374"
            @click="handleClick(card)"
          >
            <v-card-title>{{ card.title }}</v-card-title>

            <v-card-text class="font-italic">
              {{ card.air_date }}
            </v-card-text>
            <v-card-text v-for="(character, i) in card.characters" :key="i">
              {{ character }}
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="getSeasonTwo">
          <v-card
            v-for="(card, i) in getSeasonTwo"
            :key="i"
            class="mx-auto my-12"
            max-width="374"
            @click="handleClick(card)"
          >
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>
              {{ card.air_date }}
            </v-card-text>
            <v-card-text v-for="(character, i) in card.characters" :key="i">
              {{ character }}
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="getSeasonThree">
          <v-card
            v-for="(card, i) in getSeasonThree"
            :key="i"
            class="mx-auto my-12"
            max-width="374"
            @click="handleClick(card)"
          >
            <v-card-title>{{ card.title }}</v-card-title>

            <v-card-text>
              {{ card.air_date }}
            </v-card-text>
            <v-card-text v-for="(character, i) in card.characters" :key="i">
              {{ character }}
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="getSeasonFour">
          <v-card
            v-for="(card, i) in getSeasonFour"
            :key="i"
            class="mx-auto my-12"
            max-width="374"
            @click="handleClick(card)"
          >
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>
              {{ card.air_date }}
            </v-card-text>
            <v-card-text v-for="(character, i) in card.characters" :key="i">
              {{ character }}
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="getSeasonFive">
          <v-card
            v-for="(card, i) in getSeasonFive"
            :key="i"
            class="mx-auto my-12"
            max-width="374"
            @click="handleClick(card)"
          >
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>
              {{ card.air_date }}
            </v-card-text>
            <v-card-text v-for="(character, i) in card.characters" :key="i">
              {{ character }}
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MainCards",
  data: () => ({
    episodes: [],
    tabs: null,
    search: "",
    globalSearch: false,
  }),
  methods: {
    async getEpisodes() {
      try {
        const res = await fetch("https://www.breakingbadapi.com/api/episodes");
        this.episodes = await res.json();
      } catch (err) {
        console.log(err);
      }
    },
    handleClick(cardInfo) {
      this.$router.push({
        name: "characters",
        params: { cardInfo },
      });
      localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
    },
    searchEpisodes() {
      this.globalSearch = true;
      return this.episodes.filter((episode) => {
        return episode.title.toLowerCase().match(this.search);
      });
    },
  },
  computed: {
    getSeasonOne: function () {
      if (this.globalSearch) {
        return this.searchEpisodes();
      } else return this.episodes.filter((episode) => episode.season === "1");
    },
    getSeasonTwo: function () {
      if (this.globalSearch) {
        return this.searchEpisodes();
      } else return this.episodes.filter((episode) => episode.season === "2");
    },
    getSeasonThree: function () {
      if (this.globalSearch) {
        return this.searchEpisodes();
      } else return this.episodes.filter((episode) => episode.season === "3");
    },
    getSeasonFour: function () {
      if (this.globalSearch) {
        return this.searchEpisodes();
      } else return this.episodes.filter((episode) => episode.season === "4");
    },
    getSeasonFive: function () {
      if (this.globalSearch) {
        return this.searchEpisodes();
      } else return this.episodes.filter((episode) => episode.season === "5");
    },
  },
  watch: {
    search() {
      if (this.search === "") {
        this.globalSearch = false;
      }
    },
  },
  mounted() {
    this.getEpisodes();
  },
};
</script>
