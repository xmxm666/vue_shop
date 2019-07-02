export default {
  totalCount (state) {
    return state.cartFood.reduce((preTotal, food) => preTotal + food.cartCount , 0);
  },
  totalPrice (state) {
    return state.cartFood.reduce((preTotal, food) => preTotal + food.price*food.cartCount , 0);
  }
}
