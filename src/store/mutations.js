/**
 * 直接更新state的多个方法对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_CART_FOOD,
  RESET_CART_FOOD, CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address;
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys;
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops;
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {};
  },
  [RECEIVE_SHOP_INFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo;
  },
  [RECEIVE_SHOP_GOODS] (state, {goods}) {
    state.goods = goods;
  },
  [RECEIVE_SHOP_RATINGS] (state, {ratings}) {
    state.ratings = ratings;
  },
  [RECEIVE_CART_FOOD] (state, {food}) {
    if(!food.cartCount) {
      //添加到购物车
      Vue.set(food, 'cartCount', 1);
      state.cartFood.push(food);
    }else {
      food.cartCount = food.cartCount + 1;
    }
  },
  [RESET_CART_FOOD] (state, {food}) {
    food.cartCount = food.cartCount - 1;
    if(food.cartCount <= 0) {
      const index = state.cartFood.indexOf(food);
      state.cartFood.splice(index, 1);
    }
  },
  [CLEAR_CART] (state) {
    state.cartFood.forEach(food => {
      food.cartCount = 0;
    })
    state.cartFood = [];
  }
}
