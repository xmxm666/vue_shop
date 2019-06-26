/**
 * 包含n个接口请求函数的模块
 * 函数的返回值： promise 对象
 */
import ajax from './ajax'
// const BASE_URL = "http://localhost:4000"
const BASE_URL = '/api'

//1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);
//2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category');
//3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax(BASE_URL + '/shops', {latitude, longitude});
//6、用户名密码登陆
export const reqLoginPwd = (params) => ajax(BASE_URL + '/login_pwd',params, "POST");
//手机号验证码登陆
export const reqLoginSms = (params) => ajax(BASE_URL + '/login_sms',params, "POST");
//用户登出logout
export const reqLoginout = (params) => ajax(BASE_URL + '/logout',params, "POST");

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')

export const reqTest = () => ajax('/test')
