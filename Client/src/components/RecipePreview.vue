<template>
  <b-card no-body class="RecipePreview zoom">
    <b-row no-gutters class="RecipeBody">
      <b-col>

        <router-link :to="{ name: name, params: { recipeId: recipe.id,favorite:recipe.favorite } }">
            <b-card-img :src="recipe.image" alt="Image" class="RecipeImage" ></b-card-img>
        </router-link>
        <router-link :to="{ name: name, params: { recipeId: recipe.id,favorite:recipe.favorite } }">
           <b-card-title  class="RecipeTitle">{{shortenTitle(recipe.title)}}</b-card-title>
        </router-link>
            <div>
              <watchedFavoriteData class="text-left" style="margin-right: 15%"
                                    :id="parseInt(this.recipe.id)"
                                    :watched="this.recipe.watched"
                                    :favorite="this.recipe.favorite">
              </watchedFavoriteData>
            <b-icon v-if="recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 15px;">  {{ recipe.readyInMinutes }} minutes</a>
            <b-icon v-if="recipe.popularity>-1" icon="heart" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 15px;"> {{ recipe.popularity }}</a>
          </div>
           <div id="badge">
            <b-badge style="margin-top: 5px; margin-right: 5px" v-if="recipe.vegan" variant="success">Vegan</b-badge>
            <b-badge style="margin-top: 5px;margin-right: 5px" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
            <b-badge style="margin-top: 5px;margin-right: 5px" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
             <b-badge style="margin-top: 10px;margin-right: 5px" v-else variant="warning">Have Gluten</b-badge>
           </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import watchedFavoriteData from "./watchedFavoriteData.vue";
export default {
  components: {
   watchedFavoriteData
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  methods: {
    shortenTitle(title) {
      if (title.length <= 20) {
        return title;
      } else {
        return title.substring(0, 20) + '...';
      }
    }
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    name:{
      type:String,
      required:true

    },
    
  },
}
</script>

<style scoped>
.RecipePreview {
  padding-bottom: 10px;
  width: 100%;
  height: 330px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-bottom: 10px;

}
.RecipeBody .RecipeImage {
  border-radius: 15px;
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-position: center;
  min-width: 100%;
  height: 70%;
    max-height: 200px;
}

.RecipePreview .RecipeFooter {
  /*text-align: center;*/
  /*align-items: center;*/
  font-size: 14px;
}

.RecipeBody .RecipeTitle {
  padding-top: 10px;
  width: 95%;
  font-size: 18px;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
.zoom {
    transition: transform .2s;
    transform-origin: center;
}
.zoom:hover {
    z-index: 4;
    transform: scale(1.3);
}
#badge{
    text-align: center;
}
</style>