<template>
  <div class="container" >
    <h1 class="title" style="text-align: center">Search Page</h1>
    <b-input-group class="d-flex">
      <b-form-input id="search_input"
        v-model="query"
        placeholder="Enter your Search"
        @keyup.enter="SearchRecipes(query,number)" class="w-25"
      ></b-form-input>
        <b-button variant="outline-success" @click="toggleDialog">Filter</b-button>
      <b-dropdown :text="orderBy" variant="outline-success">
        <b-dropdown-item @click="changeParameter('readyInMinutes')">readyInMinutes</b-dropdown-item>
        <b-dropdown-item @click="changeParameter('popularity')">popularity</b-dropdown-item>
      </b-dropdown>
        <b-dropdown :text="dropdownText" variant="outline-success">
          <b-dropdown-item @click="selectAmount(5)">5</b-dropdown-item>
          <b-dropdown-item @click="selectAmount(10)">10</b-dropdown-item>
          <b-dropdown-item @click="selectAmount(15)">15</b-dropdown-item>
        </b-dropdown>
        <b-button variant="outline-success" @click="SearchRecipes(query,number)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
        </b-button>
    </b-input-group>
    <div v-if="dialogOpen" class="filter-dialog">
      <div class="filter-dialog-content">
        <ul>
          <br>
          <b-row >
            <b-col md="3">
          <h5>Intolerance:</h5>
          <li v-for="option in options_intolerances" :key="option.value">
            <b-form-checkbox v-model="option.checked" @change="handleOptionChange(option, options_intolerances)" :disabled="!option.checked && checkedOption">
              {{ option.label }}
            </b-form-checkbox>
          </li>
            </b-col>
            <b-col md="3">
          <h5>Diet:</h5>
          <li v-for="option in options_diet" :key="option.value">
            <b-form-checkbox v-model="option.checked" @change="handleOptionChange(option, options_diet)" :disabled="!option.checked && checkedOption">
              {{ option.label }}
            </b-form-checkbox>
          </li>
              </b-col>
            <b-col md="3">
              <h5>Cuisine:</h5>
              <li v-for="option in options_cuisine" :key="option.value">
                <b-form-checkbox v-model="option.checked" @change="handleOptionChange(option, options_cuisine)" :disabled="!option.checked && checkedOption">
                  {{ option.label }}
                </b-form-checkbox>
              </li>
            </b-col>
          </b-row>
          <b-button @click="reset_options" variant="outline-success" >Reset</b-button>
        </ul>
      </div>
    </div>
    <div class="mt-3">
      <b-container>
        <b-row id="waiting_animation" md="6" class="mb-3 d-flex justify-content-center" :class="{ hidden: isHidden, reveal: !isHidden }" :style="{ display: displayStyle }" >
          <b-icon icon="arrow-clockwise" animation="spin" font-scale="10" :style="{ display: displayStyle } "></b-icon>
        </b-row>
        <b-row v-if="chunkedRecipes.length > 0">
          <b-row v-for="(row, rowIndex) in chunkedRecipes" :key="rowIndex">
            <b-col v-for="recipe in row" :key="recipe.id">
              <RecipePreview class="recipePreview" :recipe="recipe" name="recipe" />
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
      SearchWasClicked: false,
      lastQuery: "",
      isHidden: true,
      displayStyle: 'none',
      query: "",
      number: "5",
      selectedAmount: null,
      hasResponse: false,
      recipes: [],
      options_intolerances: [
        { label: 'Dairy', value: 'Dairy', checked: false },
        { label: 'Egg', value: 'Egg', checked: false },
        { label: 'Gluten', value: 'Gluten', checked: false },
        { label: 'Peanut', value: 'Peanut', checked: false },
        { label: 'Seafood', value: 'Seafood', checked: false },
        { label: 'Sesame', value: 'Sesame', checked: false },
        { label: 'Shellfish', value: 'Shellfish', checked: false },
        { label: 'Soy', value: 'Soy', checked: false },
        { label: 'Sulfite', value: 'Sulfite', checked: false },
        { label: 'Tree Nut', value: 'Tree Nut', checked: false },
        { label: 'Wheat', value: 'Wheat', checked: false },
      ],
      options_diet: [
        { label: 'Gluten Free', value: 'Gluten Free', checked: false },
        { label: 'Ketogenic', value: 'Ketogenic', checked: false },
        { label: 'Vegetarian', value: 'Vegetarian', checked: false },
        { label: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian', checked: false },
        { label: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian', checked: false },
        { label: 'Vegan', value: 'Vegan', checked: false },
        { label: 'Pescetarian', value: 'Pescetarian', checked: false },
        { label: 'Paleo', value: 'Paleo', checked: false },
        { label: 'Whole30', value: 'Whole30', checked: false }
      ],
      options_cuisine: [
        { label: 'African', value: 'African', checked: false },
        { label: 'American', value: 'American', checked: false },
        { label: 'British', value: 'British', checked: false },
        { label: 'Japanese', value: 'Japanese', checked: false },
        { label: 'Jewish', value: 'Jewish', checked: false },
        { label: 'Mexican', value: 'Mexican', checked: false },
        { label: 'Spanish', value: 'Spanish', checked: false },
        { label: 'Thai', value: 'Thai', checked: false },
        { label: 'Vietnamese', value: 'Vietnamese', checked: false },
        { label: 'Nordic', value: 'Nordic', checked: false },
        { label: 'European', value: 'European', checked: false },
        { label: 'French', value: 'French', checked: false }
      ],
      dialogOpen: false,
      filter_change: false,
      order_by_bool: false,
      parameter: 'popularity',
      amount_changed: true,
      counter :0,
    }
  },
  computed: {
    dropdownText() {
      if (this.selectedAmount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.number = this.selectedAmount;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.amount_changed = true;
        return `Amount (${this.selectedAmount})`;
      } else {
        return "Amount (5)";
      }
    },
    // eslint-disable-next-line vue/no-async-in-computed-properties
    chunkedRecipes() {
      if (!this.order_by_bool){
        if (!this.SearchWasClicked){
          return this.$root.store.LastSearchRecipes
        }
      }
      // Split recipes into chunks of size 5
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.order_by_bool = false;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.SearchWasClicked = false;
      let chunk_back;
      if (this.recipes.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.recipes = [].concat(...this.$root.store.LastSearchRecipes);
      }
      ;
      if (this.parameter === 'popularity') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.recipes = this.recipes.sort((a, b) => b[this.parameter] - a[this.parameter])

      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.recipes = this.recipes.sort((a, b) => a[this.parameter] - b[this.parameter])

      }
      chunk_back = this.recipes.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
      }, []);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$root.store.LastSearchRecipes = chunk_back;
      return chunk_back
    },
    orderBy(){
      return 'OrderBy: ' + this.parameter
    },
  },

  methods: {
    changeParameter(parameter){
      if(parameter !== this.parameter)
      {
        this.order_by_bool = true;
      }
      else {
        this.order_by_bool = true;
      }
      this.parameter = parameter;
    },
    handleOptionChange(selectedOption, listOptions) {
      // Loop through all options and uncheck them except for the selected option
      listOptions.forEach((option) => {
        if (option.value !== selectedOption.value) {
          option.checked = false;
        }
      });
      this.filter_change = true;
    },
    getCheckedValues() {
      const checkedValues = {
        intolerance: "",
        diet: "",
        cuisine: ""
      };
      // Loop through the first list of options
      for (const option of this.options_intolerances) {
        if (option.checked) {
          checkedValues["intolerance"] = option.value;
        }
      }
      // Loop through the second list of options
      for (const option of this.options_diet) {
        if (option.checked) {
          checkedValues["diet"] = option.value;
        }
      }
      // Loop through the third list of options
      for (const option of this.options_cuisine) {
        if (option.checked) {
          checkedValues["cuisine"] = option.value;
        }
      }
      return checkedValues;
    },
    reset_options() {
      this.options_intolerances.forEach((option) => {
        option.checked = false;
      });
      this.options_diet.forEach((option) => {
        option.checked = false;
      });
      this.options_cuisine.forEach((option) => {
        option.checked = false;
      });
      this.filter_change = true;
    },
    toggleDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    toggleAnimation() {
      this.isHidden = !this.isHidden;
    },
    showWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'block';
    },
    hideWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'none';
    },
    async SearchRecipes(query,number) {
      try {
        if ((this.query !== "" && this.query !== undefined && this.query!== this.lastQuery)||(this.amount_changed)||(this.filter_change)) {
          if(this.dialogOpen)
          {
            this.dialogOpen = false;
          }
          this.showWatingAnimation()
          this.hasResponse = false;
          this.filter_change = false;
          this.amount_changed = false;
          this.lastQuery = this.query;
          let filter = this.getCheckedValues();
          const response = await this.axios.get(
            `${this.$root.store.server_domain}/recipes/search?query=${encodeURIComponent(this.query)}
            &number=${encodeURIComponent(this.number)}
            &intolerance=${encodeURIComponent(filter.intolerance)}
            &diet=${encodeURIComponent(filter.diet)}
            &cuisine=${encodeURIComponent(filter.cuisine)}`
          );
          console.log(response);
          let recipes = response.data.recipes;
          this.recipes = [];
           for (let recipe of recipes) {
          await this.updateWatchedFavorite(recipe);
        }
          this.hideWatingAnimation()
          this.hasResponse = true;
          this.SearchWasClicked = true;
          this.recipes.push(...recipes);
          console.log(this.recipes);
        }
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
    },

    selectAmount(amount) {
      this.selectedAmount = amount;
    }

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
.input-group>.input-group-prepend {
  flex: 0 0 30%;
}
.input-group .input-group-text {
  width: 50%;
}
</style>