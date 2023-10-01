<template>
  <div class="container" >
    <h1 class="title" style="text-align: center">My Favorite Recipes</h1>
    <div class="mt-3">
      <b-container>
        <b-row id="waiting_animation" md="6" class="mb-3 d-flex justify-content-center" :class="{ hidden: isHidden, reveal: !isHidden }" :style="{ display: displayStyle }" >
          <b-icon icon="arrow-clockwise" animation="spin" font-scale="10" :style="{ display: displayStyle } "></b-icon>
        </b-row>
        <b-row v-if="chunkedRecipes.length > 0 ">
          <b-row v-for="(row, rowIndex) in chunkedRecipes" :key="rowIndex">
            <b-col v-for="recipe in row" :key="recipe.id">
              <RecipePreview class="recipePreview" :recipe="recipe" name="recipe"/>
            </b-col>
          </b-row>
        </b-row>
        <div v-else-if="hasResponse">
          Not Found any recipe
        </div>
      </b-container>
    </div>
  </div>
</template>


<script>
import RecipePreview from "@/components/RecipePreview.vue";

export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      lastQuery: "",
      isHidden: true,
      displayStyle: 'none',
      selectedAmount: null,
      hasResponse: false,
      recipes: []
    };
  },
  computed: {
    chunkedRecipes() {
      let chunk_back;
      chunk_back = this.recipes.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
      }, []);
      return chunk_back
    }
  },
  methods: {
    toggleAnimation() {
      this.isHidden = !this.isHidden;
    },
    showWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'block'; // set display to 'block' to show the element
    },
    hideWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'none'; // set display to 'none' to hide the element
    },
    async SearchRecipes() {
      try {
        this.showWatingAnimation()
        this.hasResponse = false;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          {withCredentials:true}
        );
        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.hideWatingAnimation()
        this.hasResponse = true;
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  }
  ,
  mounted() {
    this.SearchRecipes();
  }
};
</script>

<style lang="scss" scoped>
.SearchRecipes{
  margin: 10px 0 10px;
}

#search_input{
  width: 75%;
}

.hidden {
  animation: fadeOut 1s ease-in-out forwards;
}

.reveal{
  animation: fadeIn 1s ease-in-out forwards;

}
.recipePreview {
  display: block;
  margin-left: 40px;
  align-items: center;
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
}
</style>