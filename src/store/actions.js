/*
通过mutation间接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_SHOPS,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_CART_FOOD,
  RESET_CART_FOOD,
  CLEAR_CART
} from './mutation-types'

import {reqAddress, reqFoodCategorys, reqLoginPwd, reqShops, reqShopInfo, reqShopGoods, reqShopRatings} from '../api'

export default {
 async getAddress({commit,state}) {
   const geohash = state.latitude + ',' + state.longitude;
   const result = await reqAddress(geohash);
   if(result.code === 0) {
     const address = result.data
     commit(RECEIVE_ADDRESS, {address});
   }
 },

  async getCategorys({commit}) {
    const result = await reqFoodCategorys();
    if(result.code === 0) {
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS, {categorys});
    }
  },
  // 异步获取商家列表
  async getShops({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //6、用户名密码登陆
  async loginPwd({commit, state}, params) {
    const result = await reqLoginPwd(params)
    // 提交一个mutation
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
    return result;
  },

  // 异步获取商家信息
  async getShopInfo({commit, state}, params) {
    const result = await reqShopInfo(params)
    // 提交一个mutation
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  },
  // 异步获取商家商品
  async getGoods({commit, state}, params) {
    const result = await reqShopGoods(params)
    // 提交一个mutation
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, {goods})
    }
  },
  // 异步获取商家评论
  async getRatings({commit, state}, params) {
    const result = await reqShopRatings(params)
    // 提交一个mutation
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_SHOP_GOODS, {ratings})
    }
  },
  //添加商品到购物车
  addFoodToCart({commit, state}, {isAdd, food}) {
    if(isAdd) {
      commit(RECEIVE_CART_FOOD, {food})
    }else {
      commit(RESET_CART_FOOD, {food});
    }
  },
  clearCart({commit}) {
    commit(CLEAR_CART)
  }

}
