import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchview';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Likes from './models/Likes';
/*
Global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};
window.state = state;
/*
SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1. get the query from view
    const query = searchView.getInput();


    if (query) {
        // 2. new search object and add it to state
        state.search = new Search(query);


        // 3. Prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        try {
            // 4. search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);


        } catch (error) {
            alert('something went wrong with search..');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    controlSearch(); searchView.getInput()
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }

});

/*
RECIPE CONTROLLER
*/
const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //http://localhost:8080/ here is no hash, so in this case we dont want to create an id

        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight the selected search item
        if (state.search) searchView.highlightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parceIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe,
                state.likes.isLiked(id),
                );
        } catch (error) {
            alert('error processing recipe!')
        }


    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//above 2 lines can also be written as:

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
//this means we are passing the elements the the above array as event in the function 


/*
List CONTROLLER
*/
const controlList = () => {
    //create a new list if there is none yet
    if (!state.list) state.list = new List();

    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

//handle delete and update item list
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);

        //handle the count update
    }else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

});

/*
Likes CONTROLLER
*/



const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    //user has not yet liked the current recipe
    if(!state.likes.isLiked(currentID)) {

        //add like to the state
      const newLike = state.likes.addLike(
          currentID,
          state.recipe.title,
          state.recipe.author,
          state.recipe.img,

      );

        //toggle the like button
        likesView.toggleLikeBtn(true);
        //add like to UI list
        likesView.renderLike(newLike);

    //user has liked the current recipe
    } else {

        //remove like from the state
    state.likes.deleteLike(currentID);
        //toggle the like button
    likesView.toggleLikeBtn(false);
        //remove like from UI list
        likesView.deleteLike(currentID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

  //restore liked recipes when page reloads
    window.addEventListener('load', () => {
        state.likes = new Likes();

        //restore likes
        state.likes.readStorage();

        //toggle like menu button
        likesView.toggleLikeMenu(state.likes.getNumLikes());

        //render the existing likes
        state.likes.likes.forEach(like => likesView.renderLike(like)); 
    });


//handling recipe button clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is called
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
        //increase button is called
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredients to shopping list
        controlList();
    }else if (e.target.matches('.recipe__love, .recipe__love *')){
        //like controller
        controlLike();
    }
});

window.l = new List();