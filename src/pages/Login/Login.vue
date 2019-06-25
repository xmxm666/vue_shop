<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder=" 手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"  :class="{right_phone:rightPhone}" @click.prevent="sendMsg">
                {{codeMsg}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder=" 验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder=" 手机/ 邮箱/ 用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder=" 密码" v-model="pwd" v-if="switchValue">
                <input type="password" maxlength="8" placeholder=" 密码" v-model="pwd" v-else>
                <div class="switch_button" :class="switchValue?'on':'off'" @click="switchValue=!switchValue">
                  <div class="switch_circle" :class="{right: switchValue}"></div>
                  <span class="switch_text">{{switchValue ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder=" 验证码" v-model="captcha">
                <img class="get_verification" :src="bathPath+'/captcha'" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
        </span>
    </div>
  </div>
</template>

<script>
  import {checkPhone} from '../../utils/index'
  import {errorToast, successToast} from "../../common/ToastUtil";
  import {bathPath} from "../../api/path";
  import {reqLoginSms, reqLoginPwd} from '../../api/index'

  export default {
      data() {
        return {
          bathPath,
          loginWay: true,
          phone: '',
          code:'',
          codeMsg:"获取验证码",
          remainTime: 0,
          captcha: "",
          name: "",
          pwd: "",
          switchValue: false
        }
      },
      computed: {
        rightPhone() {
          return checkPhone(this.phone);
        },
      },
      methods: {
        //发送验证码
        sendMsg() {
          const isRight = checkPhone(this.phone);
          if(!isRight) {
            errorToast("请输入正确的手机号");
          }
          if(this.codeMsg !== '获取验证码') {
            return;
          }
          //发送验证码
          //sendMsg
          const result = {code: 0, msg:'验证码发送成功！'};
          if(result.code){
            errorToast(result.msg);
          } else {
            successToast(result.msg);
            let {remainTime} = this;
            remainTime = 60;
            var intervalId = setInterval(() => {
              remainTime  = remainTime - 1;
              this.codeMsg = "已发送(" + remainTime + ")s"
              console.log(remainTime);
              if(remainTime <= 0){
                clearInterval(intervalId);
                this.codeMsg = "获取验证码";
              }
            }, 1000);
          }
        },
        //获取验证码
        getCaptcha() {
          // 每次指定的src要不一样
          this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now();
          this.captcha = '';
        },
        //登录
        async login() {
          let result;
          if(this.loginWay) {
            if(!this.rightPhone) {
              errorToast("请输入正确的手机号!");
              return;
            }
            if(!this.code) {
              errorToast("请输入正确的验证码！");
              return;
            }
            result = await reqLoginSms({phone:this.phone, code:this.code});
            console.log(result);
          } else {
            const {name, pwd, captcha} = this;
            if(!name) {
              errorToast("请输入用户名！");
              return;
            }
            if(!pwd) {
              errorToast("请输入密码！");
              return;
            }
            if(!captcha) {
              errorToast("请输入验证码！");
              return;
            }
            result = await reqLoginPwd({name, pwd, captcha});
            console.log(result);
          }
          if(result.code === 1) {
            errorToast(result.msg);
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
