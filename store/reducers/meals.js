import { MEALS } from "../../data/dummyData";
import { TOGGLE_FAVOURITE, SET_FILTER } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      console.log("existing index :- ", existingIndex);
      if (existingIndex >= 0) {
        const updateFavMeals = state.favMeals.filter((meal) => {
          console.log("id ", action.mealId, meal.id);
          return meal.id !== action.mealId;
        });

        console.log(state.favMeals);
        console.log("existing , ", updateFavMeals);
        return { ...state, favMeals: updateFavMeals };
      }
      const updatedFavMeals = [...state.favMeals];
      const meal = state.meals.filter((meal) => meal.id === action.mealId)[0];
      updatedFavMeals.push(meal);
      console.log("pushed ", updatedFavMeals);
      return {
        ...state,
        favMeals: updatedFavMeals,
      };
    case SET_FILTER:
      const appliedFilter = action.filter;
      console.log("filter , ", appliedFilter);
      const filteredMEALS = state.meals.filter((meal) => {
        if (appliedFilter.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilter.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilter.isVegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilter.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: filteredMEALS };
    default:
      return state;
  }
  return state;
};

export default mealsReducer;
