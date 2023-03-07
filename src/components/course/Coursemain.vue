<template>
  <div class="coursemain">
    <div class="course-main">
      <section class="search-container">
        <div class="search-item">
          <div class="title-name">课程方向：</div>
          <div class="all-items">
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
            >
              全部
            </el-tag>
            <el-tag
              :class="indexObj.indexWhere === index ? 'category-poniter':'category-poniter category-poniter-item'"
              effect="plain"
              type="info"
              v-for="(item,index) in firstArr"
              :key="index"
              @click="buildingCondition('fcategory',index,item)"
            >
              {{item.categoryName}}
            </el-tag>
          </div>
        </div>
        <div class="search-item search-item-transition" style="top: 45px">
          <div class="title-name">课程分类：</div>
          <div class="all-items">
            <el-tag
              effect="plain"
              type="info"
              class="category-poniter"
            >
              全部
            </el-tag>
            <el-tag
              effect="plain"
              type="info"
              :class="indexObj.indexType === index ? 'category-poniter':'category-poniter category-poniter-item'"
              v-for="(item,index) in secondArr"
              :key="index"
              @click="buildingCondition('scategory',index,item)"
              >{{item.categoryName}}
            </el-tag>
          </div>
        </div>
        <div class="search-item" style="top: 90px">
          <div class="title-name">课程难度：</div>
          <div class="all-items">
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
            >
              全部
            </el-tag>
            <el-tag
              :class="indexObj.indexEasy === index ? 'category-poniter':'category-poniter category-poniter-item'"
              effect="plain"
              type="info"
              v-for="(item,index) in courseLevel"
              :key="item.code"
              @click="buildingCondition('clevel',index,item)"
              >{{item.text}}
            </el-tag>
          </div>
        </div>
      </section>
    </div>
    <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li class="item active" @click="handleAllCourse">综合</li>
          <li class="item split">|</li>
          <li class="item" @click="handleNewCourse" :style="isShowColor1?'color:#2C80FF':''">最新课程</li>
          <li class="item split">|</li>
          <li class="item" @click="handleMostBuy" :style="isShowColor2?'color:#2C80FF':''">最多购买</li>
          <li class="item split">|</li>
          <li class="item item-price"
              @click="handlePrice">
            <span style="color:#2C80FF">价格</span>
            <span class="arrow">

              <i class="el-icon-caret-top"
                :style="priceSortBy == '1'?'color:#2C80FF':''"
              ></i>

              <i class="el-icon-caret-bottom"
                :style="priceSortBy == '2'?'color:#2C80FF':''"
              ></i>

            </span>
          </li>
        </ul>
        <ul class="right">
          <li class="right-item">
            <el-radio-group 
              @input="changeFreeOrMember"
              v-model="isFreeOrIsMember">
              <el-radio label="1">免费课程</el-radio>
              <el-radio label="2">会员课程</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="container-body" v-if="arrcourse.length !== 0">
        <div class="newCourseContent">
          <ul class="courseUl">
            <li
              class="courseItem"
              v-for="(item) in arrcourse"
              :key="item.id"
            >
              <div class="courseInfo">
                <router-link :to="{path:'/course-info/' + item.id }">
                  <div
                    class="memberlogo"
                  >
                    <img src="../../assets/image/member/vipLogo.png" alt="" />
                  </div>
                  <div class="courseBg">
                    <img class="courseImg" :src="item.courseCover" alt="" />
                  </div>
                </router-link>
                <div class="courseName">{{ item.courseName }}</div>
                <div class="courseDegree">
                  {{ item.type }} ·
                  {{ item.purchaseCounter + item.purchaseCnt }}人购买
                </div>
                <div class="coursePrice">

                  <div class="coursePriceZero" v-if="item.discountPrice === 0">
                    <div class="pricefree">免费学习</div>
                    <img src="../../assets/image/about/free.png" alt="" />
                  </div>

                  <div class="courseMemberbg" v-if="item.isMember == 1">
                    <span class="price">¥{{ item.discountPrice }}</span>
                    <span class="courseMember">会员免费</span>
                    <img src="../../assets/image/member/kings.png" />
                  </div>

                    <div class="price" v-if="item.isMember != 1 && item.discountPrice != 0">￥{{item.discountPrice  }}</div>

                  <div class="addCart">
                    <i class="el-icon-shopping-cart-1 cart"></i>
                    <span class="cart-text" @click="addShopCar(item.id)">加入购物车</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-body" v-else>
        <el-empty
          image="/image/about/course-empt.png"
          description="暂无课程"
        ></el-empty>
      </div>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="queryParams.pageSize"
          @current-change="queryCourse">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getFirstCategorys,getSecondCategorys,courseSearch} from '@/common/api/course'
import {addShopCar} from '@/common/api/shopCar'
import { mapState } from 'vuex';
import {createToken} from '@/common/api/createToken'
export default {
  data() {
    return {
      isShowColor1: false,
      isShowColor2: false,
      isFreeOrIsMember:'', // 免费和会员切换
      priceSortBy: 1,  // 价格选择：1为升序 2为降序
      currentIndex:undefined,
      total:0, // 课程总个数
      indexObj:{
        indexWhere:undefined,
        indexType:undefined,
        indexEasy:undefined
      },
      firstArr: [], //一级分类
      secondArr: [], //二级分类
      courseLevel: [
        //课程等级
        {
          text: "初级",
          code: "1",
        },
        {
          text: "中级",
          code: "2",
        },
        {
          text: "高级",
          code: "3",
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        total: 0,
        entity: {
          courseName: "", //课程名称
          status: 0, //状态（1：上架；0：下架）
          firstCategory: "", //一级分类
          secondCategory: "", //二级分类
          courseLevel: 0, //课程等级（1：初级；2：中级；3：高级）
          isMember: 0, //是否为会员课程（1：是；0：否）
          tags: "", //标签
          sortBy: "",
          isFree: "",
        },
      },
      // 复制
      queryParams2:{
        pageNum: 1,
        pageSize: 8,
        total: 0,
        entity: {
          courseName: "", //课程名称
          status: 0, //状态（1：上架；0：下架）
          firstCategory: "", //一级分类
          secondCategory: "", //二级分类
          courseLevel: 0, //课程等级（1：初级；2：中级；3：高级）
          isMember: 0, //是否为会员课程（1：是；0：否）
          tags: "", //标签
          sortBy: "",
          isFree: "",
        },
      },
      arrcourse: [], //课程信息
    };
  },
  computed:{
    ...mapState({
      userInfo:state => state.user.userInfo
    })
  },
  created() {
    // 获取一级
    this.getFirstCategorys();
    // 获取二级
    this.getSecondCategorys( -1 );
    // 查询课程
    this.courseSearch(this.queryParams);
  },
  methods: {
    // 获取一级: 课程方向
    getFirstCategorys(){
      getFirstCategorys().then(res => {
        this.firstArr = res.data.list;
      })  
    },
    // 获取二级：课程分类
    getSecondCategorys(id){
      getSecondCategorys({
        categoryId: id
      }).then(res => {
        this.secondArr = res.data.list;
      })
    },
    // 课程管理 查询课程
    courseSearch(params,type){
      let that = this;
      courseSearch(params).then(res => {   
        // 点击价格
        if(type == 'price'){
          // 分区 作用:重构后端返回的数据
          function partition(arr, start, end) {
            let pivot = arr[end].discountPrice;
            let i = start - 1;
            if(that.priceSortBy == 1){
              // 升序
              for (let j = start; j < end; j++) {
                if (arr[j].discountPrice < pivot) {
                  i++;
                  [arr[i].discountPrice, arr[j].discountPrice] = [arr[j].discountPrice, arr[i].discountPrice];
                }
              }
              [arr[i + 1].discountPrice, arr[end].discountPrice] = [arr[end].discountPrice, arr[i + 1].discountPrice];
            }else if(that.priceSortBy == 2){
              // 降序
              for (let j = start; j < end; j++) {
                if (arr[j].discountPrice > pivot) {
                  i++;
                  [arr[i].discountPrice, arr[j].discountPrice] = [arr[j].discountPrice, arr[i].discountPrice];
                }
              }
              [arr[i + 1].discountPrice, arr[end].discountPrice] = [arr[end].discountPrice, arr[i + 1].discountPrice];
            }
            return i + 1;
          }
          // 快速排序
          function quickSortRecursive(arr, start = 0, end = arr.length - 1) {
            if (start >= end) return;
            let index = partition(arr, start, end);
            quickSortRecursive(arr, start, index - 1);
            quickSortRecursive(arr, index + 1, end);
            return arr;
          }
          // 数据总条数
          this.total = res.data.pageInfo.total;
          this.arrcourse = quickSortRecursive(res.data.pageInfo.list);
          this.arrcourse.forEach(item => {
            if(item.courseLevel == '1'){
              item.type = '初级';
            }
            if(item.courseLevel == '2'){
              item.type = '中级';
            }
            if(item.courseLevel == '3'){
              item.type = '高级';
            }
          })
        }else{
          // 数据总条数
          this.total = res.data.pageInfo.total;
          this.arrcourse = res.data.pageInfo.list;
          this.arrcourse.forEach(item => {
            if(item.courseLevel == '1'){
              item.type = '初级';
            }
            if(item.courseLevel == '2'){
              item.type = '中级';
            }
            if(item.courseLevel == '3'){
              item.type = '高级';
            }
          })
        }
      })
    },
    // 点击页码
    queryCourse(index){
      this.queryParams.pageNum = index;
      this.courseSearch(this.queryParams);
    },
    // 点击一级 或 二级
    buildingCondition(type,index,item){
      // 点击一级
      if(type === 'fcategory'){
        this.indexObj.indexType = undefined;
        this.indexObj.indexEasy = undefined;
        // 切换 class
        this.indexObj.indexWhere = index;
        // 获取二级
        this.getSecondCategorys(item.id);
        // 清空二级
        this.queryParams.entity.secondCategory = '';
        // 难度等级赋空值
        this.queryParams.entity.courseLevel = '';
        // 根据一级查询课程
        this.queryParams.entity.firstCategory = item.id;
        this.courseSearch(this.queryParams);
      }
      // 点击二级
      if(type === 'scategory'){
        this.indexObj.indexEasy = undefined;
        // class 切换
        this.indexObj.indexType = index;
        // 根据二级查询课程
        this.queryParams.entity.secondCategory = item.id;
        this.courseSearch(this.queryParams);
      }
      if( type === 'clevel'){
        // class 切换
        this.indexObj.indexEasy  = index;
        this.queryParams.entity.courseLevel = item.code;
        this.courseSearch(this.queryParams);
      }
    },
    // 点击价格
    handlePrice(){
      if(this.priceSortBy != 1){
        // 降序
        this.queryParams.entity.sortBy = 'price-desc';
        this.priceSortBy = 1;
      }else{
        // 升序
        this.priceSortBy = 2;
        this.queryParams.entity.sortBy = 'price-asc';
      }
      this.courseSearch(this.queryParams,'price');
    },
    // 点击最新课程（按时间排序）
    handleNewCourse(){
      this.isShowColor2 = false;
      this.isShowColor1 = true;
      this.queryParams.entity.sortBy = 'time-asc';
      this.courseSearch(this.queryParams);
    },
    // 点击最多购买
    handleMostBuy(){
      this.isShowColor1 = false;
      this.isShowColor2 = true;
      this.queryParams.entity.sortBy = 'purchase-asc';
      this.courseSearch(this.queryParams);
    },
    // 点击综合
    handleAllCourse(){
      this.isShowColor1 = false;
      this.isShowColor2 = false;
      this.courseSearch(this.queryParams2);
    },
    // 免费和会员
    changeFreeOrMember( label ){
      if(label == 1){
        // 传1代表对应的是true（后端接口）
        this.queryParams.entity.isMember = '';
        this.queryParams.entity.isFree = 1;
      }
      if(label == 2){
        this.queryParams.entity.isFree = '';
        this.queryParams.entity.isMember = 1;
      }
      this.courseSearch(this.queryParams);
    },
    // 计入购物车
    addShopCar(id){
      let params = {
        courseId: id,
        memberId: this.userInfo.id
      }
      createToken().then(res => {
        let token = res.data.token;
         
        addShopCar(params,token).then(res => {
          if(res.meta.code != 200){
            this.$message({
              message: res.meta.msg,
              type: 'warning'
            });
            return;
          }else{
            this.$message({
              message: '加入购物车成功',
              type: 'success'
            });
          }
        })
        
      })
    },

  },
};
</script>


<style scoped>
.all .active,
.all .active2,
.all .active3 {
  color: #2c80ff;
}

.all .split {
  color: #d2d2d2;
}
/* 分类开始 */
.course-main {
  padding: 20px 0;
  width: 100%;
  height: 130px;
  background: #f3f5f9;
}
.search-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.search-item {
  display: flex;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  height: 45px;
  transition: all 0.5s;
}
.search-item-transition:hover {
  z-index: 777;
  height: auto;
  box-shadow: rgb(95 101 105 / 10%) 0px 12px 20px 0px;
  border-radius: 8px;
  background: rgba(255, 255, 255);
}
.search-item .title-name {
  width: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  text-align: justify;
  color: #333333;
  padding: 10px;
  opacity: 1;
}
.search-item .title-name:after {
  content: ".";
  width: 100%;
  display: inline-block;
  overflow: hidden;
  height: 0;
}

.search-item .all-items {
  width: calc(100% - 120px);
  min-height: 25px;
  display: flex;
  flex-wrap: wrap;
}
.title .all-list {
  width: 40px;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
  padding: 0 10px;
  align-items: center;
  text-align: center;
}

.title .all {
  opacity: 1;
  color: #2c80ff;
}

.title .item {
  height: 25px;
  line-height: 25px;
  margin: 0 15px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  /* color: #515759; */
  opacity: 1;
}

.title .item .active {
  color: #2c80ff;
}

.category-poniter {
  height: 25px !important;
  line-height: 25px !important;
  margin: 10px 5px !important;
  cursor: pointer !important;
  border: none !important;
  background: rgba(44, 128, 255, 0.1) !important;
  color: #2c80ff !important;
}

.category-poniter-item {
  background: none !important;
  color: rgba(81, 87, 89, 1) !important;
}

/* 分类结束 */

/* 搜索条件开始 */
.coursemain {
  width: 100%;
}

.main-container {
  width: 1200px;
  /*height: 100%;*/
  margin: 0 auto;
  /* background: chartreuse; */
}

.container-top {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.all {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}

.all .item:first-child {
  margin-right: 20px;
}

.all .item {
  margin: 0 10px;
  cursor: pointer;
}

.right {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}

.right .right-item {
  margin-left: 10px;
}

.right .right-items {
  margin-right: 0px;
}

.arrow {
  position: relative;
}

.arrow i:first-child {
  position: absolute;
  top: -1px;
}

.arrow i:last-child {
  position: absolute;
  top: 7px;
}

.check {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.up {
  position: absolute;
  top: 5px;
  left: 2px;
}

.down {
  position: absolute;
  top: 15px;
  left: 2px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}

/* 搜索调价结束 */
/* 课程内容开始 */
.newCourseContent {
  width: 1200px;
  margin: 30px auto 0px auto;
}

.newCourseContent .courseUl {
  display: flex;
  flex-wrap: wrap;
}

.newCourseContent .courseUl .courseItem {
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
}

.newCourseContent .courseUl .courseItem:hover {
  cursor: pointer;
}

.newCourseContent .courseUl .courseItem:nth-child(4n + 0) {
  margin-right: 0 !important;
}

.courseCard {
  width: 1200px;
  height: 600px;
  margin: 20px 0 0 0;
}

.courseInfo {
  position: relative;
  width: 100%;
  height: 260px;
  background: #ffffff;
  box-shadow: 2px 4px 4px rgba(27, 39, 94, 0.1);
  opacity: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: margin-top 0.2s;
  -webkit-transition: margin-top 0.2s;
}

.courseInfo:hover {
  margin-top: -10px;
}

.courseBg {
  position: relative;
  width: 100%;
  height: 160px;
}

.courseImg {
  width: 100%;
  height: 100%;
}

.courseDesc {
  position: absolute;
  top: 45px;
  left: 15px;
  font-size: 24px;
  color: #ffffff;
}

.courseName {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.courseDegree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}

.coursePrice {
  display: flex;
  font-size: 14px;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
}

.courseMemberbg {
  position: relative;
  left: 0px;
  top: 2px;
  width: 150px;
  height: 25px;
  color: red;
  font-weight: 700;
  line-height: 25px;
}

.courseMemberbg img {
  width: 15px;
  height: 10px;
  padding-left: 5px;
}

.coursePriceZero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 72px;
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
  padding: 0 1px;
  color: rgba(53, 134, 255, 1);
}

.courseMember {
  padding-left: 15px;
  /*position: absolute;
  line-height: 25px;
  left: 0px;*/
}

.memberlogo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  margin: 5px 5px 0 0;
}

.memberlogo img {
  width: 40px;
  height: 20px;
}

.price {
  line-height: 29px;
  left: 90px;
  color: #ff727f;
  font-weight: 700;
}

/* 课程内容结束 */
/* 分页开始 */
.pages {
  width: 100%;
  height: 100%;
  margin: 50px auto !important;
}

.addCart {
  margin-top: 3px;
  color: #ff3d17;
}

/* 分页结束 */
</style>
