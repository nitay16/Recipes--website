<template>
  <div class="background">
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1 style="text-align: center">{{ recipe.title }}</h1>
          <img v-if="recipe.image" :src="recipe.image" class="center img-page"/>
        </div>
        <div class="specialthings">
          <b-badge style="margin-top: 10px; margin-right: 5px" v-if="recipe.vegan" variant="success">Vegan</b-badge>
          <b-badge style="margin-top: 10px;margin-right: 5px" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
          <b-badge style="margin-top: 10px;margin-right: 5px" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
          <b-badge style="margin-top: 10px;margin-right: 5px" v-else variant="warning">Have Gluten</b-badge>

        </div>
        <div class="regular-details">
            <b-icon v-if="this.recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;">  {{ this.recipe.readyInMinutes }} minutes</a>
            <div> Servings: {{this.recipe.servings}} </div> 

        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <h2>Ingredients:</h2>
              <ul>
                <li v-for="(r,index) in recipe.extendedIngredients" :key="'_' + index">
                  {{ r }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <h2>Instructions:</h2>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.number">
                  {{ s.description }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      response = this.$route.params.response;
      const id_param = this.$route.params.recipeId;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/users/GetfullPersonalRecipes",
          { withCredentials: true }
        );

        let recipes = response.data["full_personal_recipes"];
        for (let recipe of recipes) {
          if (recipe.id === Number(id_param)) {
            this.recipe = recipe;
          }
        }

        if (this.recipe !== null) {
          const instructions = this.recipe.instructions;
          const steps = instructions.split(/\d+\.\s/).filter(Boolean);

          const analyzedInstructions = steps.map((step, index) => {
            return {
              number: index + 1,
              description: step.trim(),
            };
          });

          this.recipe.instructions = analyzedInstructions;
          const extendedIngredients = this.recipe.extendedIngredients.split(',');

          this.recipe.extendedIngredients = extendedIngredients;
        }

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.recipe-header {
  text-align: center;
}

.recipe-header h1 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}

.wrapped {
  width: 48%;
}

.wrapped h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.container {
    max-width: 900px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.ingredients {
  margin-bottom: 20px;
}

.ingredients h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.specialthings {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* text-align: left; */
  margin-bottom: 20px;
}

#recipe_image{
    width:60%;
    border-radius:5%;

}
</style>
