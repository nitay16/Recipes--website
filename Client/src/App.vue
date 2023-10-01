<template>
  <div id="app">
    <div id="nav">
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item><router-link :to="{ name: 'main' }">Main</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <span v-if="!$root.store.username" class="nav-item">
            Hello Guest
            <router-link :to="{ name: 'login' }">Login</router-link>
            <router-link :to="{ name: 'register' }">Register</router-link>
          </span>
          <span v-else class="nav-item">
            <b-button  variant="outline-success" @click="showModal">Add Recipe</b-button>
            <b-nav-item-dropdown :text="$root.store.username" left style="font-size: 100%">
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_favorite_recipes' }">My favorite recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_recipes' }">My recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_family_recipes' }">My family recipes</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
            <b-button class="button-4" variant="outline-success" @click="Logout">Logout</b-button>
          </span>
        </b-navbar-nav>
      </b-navbar>
      <router-view />
    </div>
    <img id="BackGround_IMG" src="../src/assets/Background.jpg">
    <div class="modal-content">
      <b-modal class="add_recipe"  ref="my-modal" hide-footer title="Add Personal Recipe" size="lg">
        <b-form-group  label-cols="4" label-cols-lg="2" label-size="me" label="Title" label-for="Title" >
          <b-form-input v-model="recipe.title"  size="me" required placeholder="Enter the Name of the recipe">
          </b-form-input >
        </b-form-group>
        <b-form-group  label-cols="4" label-cols-lg="2" label-size="me" label="readyInMinutes" label-for="readyInMinutes">
          <b-form-input  type="number"  v-model="recipe.readyInMinutes" size="me" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Image">
          <b-form-input v-model="recipe.image" placeholder="Enter the image URL"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Servings">
          <b-form-input type="number" v-model="recipe.servings" size="me" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Vegan">
          <b-form-checkbox v-model="recipe.vegan" true-value=true false-value=false required></b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Vegetarian">
          <b-form-checkbox v-model="recipe.vegetarian" true-value=true false-value=false required></b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Gluten Free">
          <b-form-checkbox v-model="recipe.glutenFree" true-value=true false-value=false required></b-form-checkbox>
        </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="Extended Ingredients">
            <div v-for="(ingredient, index) in ingredients" :key="index">
              <b-form-input v-model="ingredients[index]" size="me"></b-form-input>
              <b-button @click="removeIngredient(index)" variant="outline-danger">-</b-button>
            </div>
            <b-button @click="addIngredient" variant="outline-success">+</b-button>
            <b-input  hidden v-model="recipe.extendedIngredients" :value="joinedIngredients"></b-input>
          </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="me" label="instructions">
          <div v-for="(instruct, index) in instructions_list" :key="index">
            <b-form-input v-model="instructions_list[index]" size="me"></b-form-input>
            <b-button @click="removeInstruct(index)" variant="outline-danger">-</b-button>
          </div>
          <b-button @click="addInstruct" variant="outline-success">+</b-button>
          <b-input  hidden v-model="recipe.instructions" :value="joinedInstruction"></b-input>
        </b-form-group>
        <b-row class="mt-3 justify-content-center">
          <b-col cols="1">
            <b-button variant="outline-success" type="submit" @click="addRecipe">Add</b-button>
          </b-col>
          <b-col cols="1">
            <b-button variant="outline-danger" @click="closeModal">Cancel</b-button>
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    joinedIngredients() {
      let join = this.ingredients.join(', ');
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.recipe.extendedIngredients = this.ingredients.join(', ');
      return join

    },
    joinedInstruction() {
      let instructions = '';
      for (let i = 0; i < this.instructions_list.length; i++)
      {
        instructions += (i+1) + ". " + this.instructions_list[i] + ". ";
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.recipe.instructions = instructions;
      return instructions;
    },
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    closeModal() {
      this.recipe = {
        title: '',
        readyInMinutes: 0,
        image: '',
        servings: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        extendedIngredients: '',
        instructions: ''
      }
      this.ingredients = [];
      this.instructions_list = [];
      this.$refs['my-modal'].hide()
    },
    addIngredient() {
      this.ingredients.push('');
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruct() {
      this.instructions_list.push('');
    },
    removeInstruct(index) {
      this.instructions_list.splice(index, 1);
    },
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.axios.post(this.$root.store.server_domain + "/Logout", {withCredentials: true})
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async addRecipe() {
      try {
        const response  = await this.axios.post(this.$root.store.server_domain + "/users/AddPersonalRecipe", {
          title: this.recipe.title,
          readyInMinutes: this.recipe.readyInMinutes,
          image: this.recipe.image,
          servings: this.recipe.servings,
          popularity: 0,
          vegan: this.recipe.vegan,
          vegetarian: this.recipe.vegetarian,
          glutenFree: this.recipe.glutenFree,
          extendedIngredients: this.recipe.extendedIngredients,
          instructions: this.recipe.instructions
        },
        {
          withCredentials: true,
          }
        )
        if (response.status === 201) {
          this.closeModal();
          this.$root.toast("Success", "Recipe added successfully", "success");
          this.$root.store.recipeAdded = true;

        } else {
          console.log(response);
          this.$root.toast("Error", "Failed to add recipe", "error");
        }
      } catch (error) {
        console.log(error);
        this.$root.toast("Error", "Failed to add recipe", "error");
      }
    }
  },
  data() {
    return {
      recipe: {
        title:"",
        readyInMinutes: 0,
        image: "",
        servings: 0,
        popularity: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        extendedIngredients:"",
        instructions:""
      },
      ingredients: [],
      instructions_list: [],
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  min-height: 100vh;
  font-family: 'DynaPuff', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


#nav {
  padding: 30px;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
  width: 100%;
}

#nav a.router-link-exact-active {
  color: black;
  width: 100%;
}

.nav-item {
  text-shadow: rgb(255, 255, 255) 0 0 20px;
  align-items: center;
  justify-content: flex-end;
  display: inline-block;
  vertical-align: middle;
  font-size: 150%;

}

.nav-item > * {
  margin-left: 10px;
  font-weight: bold;
}
.add_recipe b-form-input{
  width: 50px;
}
#BackGround_IMG{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -30;
  opacity: 0.7;
}
/** Font Import For Titles **/
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@500&display=swap');
h1 ,.title{
  font-family: 'DynaPuff', cursive;
  font-size: 350%;
  text-shadow: azure 0 0 40px;
}
.modal-content {
  font-family: 'DynaPuff', cursive;
}

.modal-content h1 {
  text-align: center;
  align-items: center;
  font-family: 'DynaPuff', cursive;
}
img{
  border-radius:15px;
}
.img-page{
  max-width: 500px;
  max-height: 300px;
}
</style>
