import {Toast } from 'mint-ui'

export const successToast = (msg) => {
  Toast({
    message: msg,
    iconClass: 'iconfont icon-ziyuanldpi1',
    duration: 3000
  });
}

export const errorToast = (msg) => {
  Toast({
    message: msg,
    iconClass: 'iconfont icon-ziyuanldpi',
    duration: 3000
  });
}

