<template>
  <b-container>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" name="recipe" />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    recipes:{
      type:Array,
      required:true
    }

  },
  
  
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.recipePreview {
  display: block;
  width: 300px;
  height: 300px;
  margin: 10px auto;
  vertical-align: middle;

}
</style>
