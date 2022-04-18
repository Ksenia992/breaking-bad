<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <span
          @click="getCharacterInfo"
          v-bind="attrs"
          v-on="on"
          :style="{ cursor: 'pointer' }"
        >
          {{ characterName }}
        </span>
      </template>
      <v-card v-for="(info, i) in character" :key="i">
        <Loader v-if="loading" />
        <v-card-title
          class="text-h5 grey lighten-2 d-flex justify-space-between"
        >
          {{ characterName }}
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="addToFavorites(character)"
                v-bind="attrs"
                v-on="on"
                :style="{ color: 'orange', cursor: 'pointer' }"
                >mdi-star</v-icon
              >
            </template>
            <span v-if="isAdded">Successfully added !</span>
            <span v-else>Add to favorites</span>
          </v-tooltip>
          <v-avatar color="yellow">
            <img :src="info.img" alt="character" />
          </v-avatar>
        </v-card-title>

        <p><span class="infoItem">Date of birth:</span> {{ info.birthday }}</p>
        <p><span class="infoItem">Nickname:</span> {{ info.nickname }}</p>
        <p><span class="infoItem">Portrayed:</span> {{ info.portrayed }}</p>
        <div class="d-flex">
          <p class="infoItem">Appearance in seasons:</p>
          <span v-for="(season, i) in info.appearance" :key="i" class="pl-2">
            {{ season }};</span
          >
        </div>
        <p>
          <span class="infoItem">Status:</span> {{ info.status }}
          <v-icon color="primary" v-if="info.status === 'Alive'"
            >mdi-walk</v-icon
          ><v-icon color="error" v-else>mdi-coffin</v-icon>
        </p>
        <p class="text-center infoItem">Occupation:</p>
        <div v-for="(item, i) in info.occupation" :key="i">
          <p>{{ item }}</p>
        </div>
        <v-btn @click="showQuotes" class="mb-4" small depressed color="primary">
          Show character quotes
        </v-btn>
        <div v-if="showQuotesBlock">
          <div v-for="(quote, i) in quotes" :key="i">
            <p>{{ quote.quote }}</p>
          </div>
        </div>
        <p v-if="!quotes.length && showQuotesBlock">
          There are no quotes from this character on server
        </p>
        <v-divider></v-divider>
      </v-card>
      <h2 v-if="!loading && !character.length">
        There is no info about this character on server
      </h2>
      <v-btn @click="closeModal" color="error">Close</v-btn>
    </v-dialog>
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "CharacterCard",
  props: ["characterName"],
  components: { Loader },
  data: () => ({
    dialog: false,
    loading: false,
    character: [],
    quotes: [],
    showQuotesBlock: false,
    isAdded: false,
  }),
  methods: {
    async getCharacterInfo() {
      try {
        this.loading = true;
        const res = await fetch(
          `https://www.breakingbadapi.com/api/characters?name=${this.characterName}`
        );
        this.character = await res.json();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async getCharacterQuotes() {
      try {
        this.loading = true;
        const res = await fetch(
          `https://www.breakingbadapi.com/api/quote?author=${this.characterName}`
        );
        this.quotes = await res.json();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    closeModal() {
      this.dialog = false;
    },
    addToFavorites(character) {
      let [favorCharacter] = [...character];
      let favorArray = [];
      favorArray = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorArray.some((item) => item.name === favorCharacter.name)) {
        return null;
      } else {
        favorArray.push(favorCharacter);
        localStorage.setItem("favorites", JSON.stringify(favorArray));
        this.isAdded = true;
      }
    },
    showQuotes() {
      this.showQuotesBlock = true;
    },
  },
  mounted() {
    this.getCharacterQuotes();
  },
};
</script>

<style scoped>
.infoItem {
  color: green;
}
</style>
