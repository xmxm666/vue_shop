<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current:clickNum==index}" @click="menuClick(index)">
            <span class="text bottom-border-1px">
            <img class="icon" v-if="good.icon" :src="good.icon">
            {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart/>
  </div>
</template>

<script>
  import CartControl from '../../../components/CartControl/CartControl'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        clickNum: 0,
        scrollYArr: [],
        scrollY: 0,
      }
    },
    components: {
      CartControl, ShopCart
    },
    computed: {
      ...mapState(['goods'])
    },
    methods: {
      menuClick(index){
        this.clickNum=index;
        this.scrollY = - this.scrollYArr[index];
        this.foodsScroll.scrollTo(0, this.scrollY, 500);
      }
    },
    watch: {
      goods() {
        this.$nextTick(()=>{
          //初始化scroll
          new BScroll(".menu-wrapper",{
            click: true
          });
          this.foodsScroll = new BScroll(".foods-wrapper",{
            probeType: 2,  // 因为惯性滑动不会触发
            click: true
          });

          this.foodsScroll.on('scroll', ({x,y})=>{
            this.scrollY = -y;
          });
          //左侧滚动结束后，右侧菜单栏选中
          this.foodsScroll.on('scrollEnd', ({x,y})=>{
            this.scrollY = -y;
          });

          //计算数组scrollYArr的值
          const scrollYArr = [];
          let top = 0;
          scrollYArr.push(top);
          const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
          Array.prototype.slice.call(lis).forEach(arr =>{
            top = top + arr.clientHeight;
            scrollYArr.push(top);
          })
          this.scrollYArr = scrollYArr;
        })
      },

      //左侧滚动结束后，右侧菜单栏选中
      scrollY(){
        const {scrollY, scrollYArr} = this;
        for (let i = 0; i < scrollYArr.length; i++) {
          // console.log(scrollYArr[i], scrollY, scrollYArr[i+1]);
          if(scrollY >= scrollYArr[i] && scrollY < scrollYArr[i+1]) {
            this.clickNum = i;
            break;
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
