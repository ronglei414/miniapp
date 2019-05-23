<template>
  <div class="hoem_container">
    <!-- 搜索 -->
    <div class="search">
      <div class="boxInput">
        <!-- 搜索框 -->
        <input class="searchInput" type="text" placeholder="搜索">

      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <swiper indicator-dots indicator-color="rgb(255, 255, 255, 0.6)" indicator-active-color="#fff" autoplay circular interval="2000">
        <swiper-item v-for="(list, i) in bannerList" :key="i">
          <img :src="list.image_src" alt="" />
        </swiper-item>
      </swiper>
    </div>
    <!-- 导航 -->
    <div class="navs">
      <a href="" :key="i" v-for="(nav , i ) in navList">
        <img :src="nav.image_src" alt="">
      </a>
    </div>
    <!-- 楼层 -->
    <div class="floors" :key="i" v-for="(item, i) in FloorList">
      <!-- 标题 -->
      <div class="title">
        <img :src="item.floor_title.image_src" alt="">
      </div>
      <!-- 商品 -->
      <div class="goods">
        <a href="" :key="k" v-for="(list, k) in item.product_list">
          <img :src="list.image_src" alt="">
        </a>
       
      </div>
    </div>
    <!-- 返回顶部 -->
    <div class="gotop" @click="goda()" v-show="!istop">
      <P>顶</P>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  data () {
    return {
      bannerList: [],
      navList: [],
      FloorList: [],
      istop: true
    }
  },
  methods: {
    async getBanner () {
        // 使用mpvue开发小程序时，所有api的命名空间需要使用mpvue，即原理的we:request转换为mpvue：request
        // mpvue.request({
        //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        //   methods: 'get',
        //   success: (info) => {
        //     // console.log(info.data.message)
        //     this.bannerList = info.data.message;
        //   }
        // }),
        const {message} = await request({
          url : '/api/public/v1/home/swiperdata'
        })
          this.bannerList = message 
    },
    async getNav () {
      // mpvue.request({
      //   url:'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
      //   methods: 'get',
      //   sunccess : (info) => {
      //     console.log(info)
      //   }
      // })
      const {message: nav} = await request({
        url: '/api/public/v1/home/catitems'
      })
        this.navList = nav
    },
    async getFloorList () {
      const {message: FloorList} = await request({
        url : '/api/public/v1/home/floordata'
      })
        this.FloorList = FloorList
    },
    goda () {
      mpvue.pageScrollTo({
        scrollTop: 0
      });
    },
  },
  // 获取首屏数据
  created () {

    this.getBanner();
    this.getNav();
    this.getFloorList();

  },
  onPullDownRefresh () {
      this.getBanner();
      this.getNav();
      this.getFloorList();
      mpvue.stopPullDownRefresh();
  },
  onPageScroll (ev) {
      this.istop = ev.scrollTop < 200;
  }
  
}
</script>

<style scoped lang="less">
  // 使用less的话，需要将style的属性lang的值设为less，然后安装less和less-loader两个模块，不需要配置webpack

  /* 搜索盒子 */
  .boxInput {
    height: 100rpx;
    width: 100%;
    padding: 30rpx; 
    background-color: #eb4450;
    box-sizing: border-box;
    /* 搜索框 */
    .searchInput {
      height: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
      text-align: center;
    }
  }

  /* 轮播图 */
  .banner swiper {
    width: 100%;
    height: 340rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /* 导航 */
  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  /* 楼层 */
  .floors {
    .title {
      background-color: #f4f4f4;
      padding-top: 30rpx;
      img {
        width: 100%;
        height: 60rpx;
        vertical-align: middle;
      }
    }
  }
  /* 商品 */
  .floors .goods {
    overflow: hidden;
    padding: 20rpx 17rpx;
    a {
      display: block;
      float: left;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    a:first-child {
      width: 232rpx;
      height: 386rpx;
    }
    a:nth-child(2) {
      width: 273rpx;
      height: 188rpx;
    }
    a:nth-child(3) {
      width: 193rpx;
      height: 188rpx;
      margin-right: 0;
    }
    a:nth-child(4) {
      width: 193rpx;
      height: 188rpx;
    }
    a:last-child {
      width: 273rpx;
      height: 188rpx;
      margin-right: 0;
    }
  }
// 返回顶部
  .gotop{
    position: fixed;
    bottom: 60rpx;
    right : 30rpx;

    background-color: rgba(0,0,0,0.3);
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
     p {
       color:rgba(255,255,255,.7);
       text-align: center;
       line-height: 66rpx;
     }
  }
</style>
