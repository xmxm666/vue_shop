/**
 * 工具类
 */
//验证手机号是否正确
export const checkPhone = (phone) => {
  const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  return myreg.test(phone);
}
