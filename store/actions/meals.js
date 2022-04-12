export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_FILTER = "SET_FILTER";

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVOURITE, mealId: id };
};

export const setFilter = (filterSetting) => {
  return { type: SET_FILTER, filter: filterSetting };
};
