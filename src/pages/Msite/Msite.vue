<template>
  <section class="msite">
    <!-- 首页头部 -->
    <HeaderTop/>

    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!-- 首页导航 -->
        <nav class="msite_nav ">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="cate in categorys" :key="cate.id">
                  <div class="food_container">
                    <img :src="baseImgUrl + cate.image_url">
                  </div>
                  <span>{{cate.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!-- 首页附近商家 -->
        <div class="msite_shop_list border-1px">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList/>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState, mapActions} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import {baseImgUrl} from '../../api/path'

  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    data() {
      return {
        baseImgUrl
      }
    },
    components: {
      HeaderTop, ShopList
    },
    mounted() {
      this.getCategorys;
    },
    computed: {
      ...mapState(['categorys']),
      ...mapActions(['getCategorys']),

      categorysArr() {
        const {categorys} = this;
        const arr = [];
        let minArr = []
        categorys.forEach(cat => {
          if(minArr.length === 8) {
            minArr = [];
          }
          if(minArr.length === 0) {
            arr.push(minArr);
          }
          minArr.push(cat);
        })
        return arr;
      }
    },
    watch: {
      categorys(value) {
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })

         new BScroll('.miste-content-wrapper', {
            click: true
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
          padding 10px 10px 0
          .shop_icon
            margin-left 5px
            color #999
          .shop_header_title
            color #999
            font-size 14px
            line-height 20px

</style>
