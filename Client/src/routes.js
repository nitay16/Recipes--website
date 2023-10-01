import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/Search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/Recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/About",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/MyRecipe",
    name: "my_recipes",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/MyRecipePageView/:recipeId",
    name: "MyRecipePageView",
    component: () => import("./pages/MyRecipePageView"),
  },
  {
    path: "/MyFamilyRecipe",
    name: "my_family_recipes",
    component: () => import("./pages/MyFamilyRecipePage"),
  },
  {
    path: "/MyFamilyRecipePageView/:recipeId",
    name: "MyFamilyRecipePageView",
    component: () => import("./pages/MyFamilyRecipePageView.vue"),
  },
  {
    path: "/MyFavoriteRecipe",
    name: "my_favorite_recipes",
    component: () => import("./pages/MyFavoritePage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
