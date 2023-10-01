<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <RecipePreviewList :recipes="recipes"></RecipePreviewList>
  </b-container>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "WatchedRecipes",
  components: {
    RecipePreviewList
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/RecentThreeWatched",
          { withCredentials: true }
        );

        let recipes = response.data.recipes;

        for (let recipe of recipes) {
          await this.updateWatchedFavorite(recipe);
        }

        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    },
    async updateWatchedFavorite(recipe) {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/CheckFavoriteWatched/" + recipe.id,
          { withCredentials: true }
        );

        const watchedFavoriteData = response.data;
        recipe.watched = watchedFavoriteData[recipe.id].watched;
        recipe.favorite = watchedFavoriteData[recipe.id].favorite;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
