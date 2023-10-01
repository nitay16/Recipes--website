<template>
    <a v-if="$root.store.username">
        <b-icon-check-circle v-if="watched===false" class="b-icon-data zoom zoom-icon"
                  v-b-popover.hover.top="'You not watched this recipe'"/>
        <b-icon-check-circle-fill v-if="watched===true" class="b-icon-data zoom zoom-icon" style="color:#3de18c"
             v-b-popover.hover.top="'You had watched this recipe '"/>
        <b-icon-hand-thumbs-up v-if="favorite===false" class="b-icon-data zoom zoom-icon cursor-pointer"
              v-b-popover.hover.top="'click to add the recipe to your favorites'"
              v-on:click="addRecipeToFavorites" />
        <b-icon-hand-thumbs-up class="b-icon-data zoom zoom-icon cursor-pointer" style=" color: rgb(61, 225, 140); text-shadow: rgb(220, 219, 219) 10px 0px 13.3px;" v-if="favorite===true"
              v-b-popover.hover.top="'This recipe is in your favorites list'" />
    </a>
    <a v-else>
        <b-icon-check-circle class="b-icon-data zoom zoom-icon" v-b-popover.hover.top="'You need to connect to see if you watched this recipe'"></b-icon-check-circle>
        <b-icon-hand-thumbs-up class="b-icon-data zoom zoom-icon" v-b-popover.hover.top="'You need to connect to see if you like this recipe'"></b-icon-hand-thumbs-up>
    </a>
</template>

<script>
export default {
    props:{
        watched:{
            type:Boolean
        },
        favorite:{
            type:Boolean
        },
        id:{
            type:Number
        }
    },
    methods: {
  async addRecipeToFavorites() {
    try {
      const recipe_id = this.id;

      const response = await this.axios.post(
        this.$root.store.server_domain + "/users/favorites",
        { recipeId: recipe_id },
        { withCredentials: true }
      );

      if (response.status === 200) {
        this.favorite = true; // Set favorite to true after successfully adding to favorites
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } else {
        this.$router.push("*").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  },
}

};
</script>
<style>
.b-icon-data
{
    display: inline-block;
    position: relative;
    z-index: 2;
    font-size: 15px;
    margin-left: 10px;
}

.zoom-effect .zoom-icon {
    transition: transform 0.3s ease;
    cursor: pointer;
}

.zoom-effect:hover .zoom-icon {
    transform: scale(1.2); /* Increase the scale value for a stronger zoom effect */
    z-index: 3;
}
.cursor-pointer {
    cursor: pointer;
}

</style>
