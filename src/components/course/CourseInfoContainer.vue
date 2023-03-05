<template>
  <div class="courseContainer">
    <div class="courseInfoTop">
      <div class="info-container">
        <ul class="route">
          <li class="route-item" style="cursor: pointer">
            <router-link to="/course" style="color: #fff">课程</router-link>
          </li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item" style="cursor: pointer" v-if="courseInfoArr.isMember == 1">会员课程</li>
          <li class="route-item" style="cursor: pointer" v-else>免费课程</li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item">{{ courseInfoArr.courseName }}</li>
        </ul>
        <div class="name">{{ courseInfoArr.courseName }}</div>
        <div class="info">
          <div class="Avat">
            <img src="/image/Avat62.png" alt="" />
          </div>
          <ul class="teacherName">
            <li class="name-item">
              {{ courseInfoArr.createBy }}
              <img src="/image/teacherStart.png" alt="" />
            </li>
            <li class="name-item">金牌讲师</li>
          </ul>
          <ul class="access">
            <li class="access-item">难度</li>
            <li class="access-item">{{ courseInfoArr.courseLevel == 1?"初级":(courseInfoArr.courseLevel == 2?"中级":"高级") }}</li>
            <li class="access-item">·</li>
            <li class="access-item">时长</li>
            <li class="access-item">{{ courseInfoArr.totalHour }}个小时</li>
            <li class="access-item">·</li>
            <li class="access-item">学习人数</li>
            <li class="access-item">{{ courseInfoArr.clicks }}人</li>
            <li class="access-item">·</li>
            <li class="access-item">综合评分</li>
            <li class="access-item">10.00</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="info-nav">
      <div class="nav-container">
        <div class="chapter-item">
          <div :class="activeChange === 1?'active1':''" @click="change1">章节</div>
          <div class="line" :class="activeChange === 1?'active2':''"></div>
        </div>
        <div class="chapter-item">
          <div :class="activeChange === 2?'active1':''" @click="change2">下载资料</div>
          <div class="line" :class="activeChange === 2?'active2':''"></div>
        </div>
      </div>
    </div>

    <div class="course" v-if="activeChange === 1">
      <div class="main">
        <div class="introduction">
          <div class="desc">
            <!-- {{courseDetail.description ? courseDetail.description : "该课程暂无介绍  "}} -->
            该课程暂无介绍
          </div>
          <div class="btn">
            <button class="btn-item active">立即购买</button>
            <button class="btn-item">加入购物车</button>
          </div>
        </div>
        <div class="video" v-for="(item,index) in courseChapters" :key="index">
          <div class="chapterName">{{item.chapterName}}</div>
          <div class="chapterDesc">{{item.description}}</div>
          <ul class="videos">
            <li class="video-item" v-for="(j,k) in item.children" :key="k">
              <div class="video-itemIcon">
                <i class="el-icon-video-camera"></i>
              </div>

              <div class="item-name">
                <span class="shipin">视频：</span>
                <span class="chapterName">{{j.chapterName}}</span>
                <span class="free" v-if="j.publicType == 2">试看</span>
              </div>
              <button class="btn-learn" @click="goPlay(courseInfoArr.id,j.id)">开始学习</button>
              <div class="clearfloat"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="activeChange === 2">
      <div v-if="bizCourseAttachments.length > 0">
        <div class="down">
          <div class="source" 
               v-for="item in bizCourseAttachments" :key="item.id">
            <span class="downloadCourse">{{ item.attachmentName }}</span>
            <button class="downloadbtn"  @click="downloadSource(item)">下载资料</button>
          </div>
        </div>
      </div>
      <div v-else>
        <el-empty
          image="/image/about/course-empt.png"
          description="该课程暂无资料"
        ></el-empty>
      </div>
    </div>
  </div>
</template>


<script>
import { getCourseDetail,downloadAttachment } from '@/common/api/course.js'
// import { createToken } from '@/common/api/createToken'
export default {
  data() {
    return {
      courseId: this.$route.params.courseId, //路由传过来的课程ID
      courseInfoArr: {}, //课程信息
      courseChapters: [], // 课程章节信息
      bizCourseAttachments: [], // 附件资料
      activeChange: 1, // 来切换章节和资料的
    };
  },
  created() {
    // console.log(this);
    this.getCourseDetail();
  },
  methods: {
    // 获取课程详情
    getCourseDetail(){
      let params = {
        courseId: this.courseId
      }
      getCourseDetail(params).then(res => {
        // 当前课程详情信息
        this.courseInfoArr = res.data.data;
        // 渲染课程章节
        this.courseChapters = res.data.data.bizCourseChapters;
        // 当前课程资料
        this.bizCourseAttachments = res.data.data.bizCourseAttachments;
      })
    },
    // 点击章节
    change1(){
      this.activeChange = 1;
    },
    // 点击下载资料
    change2(){
      this.activeChange = 2;
    },
    // 点击章节和下载资料 （一个方法就可以实现上面两个）
    // changeCD(){
    //   this.activeChange = this.activeChange === 1?2:1;
    // },
    // 下载资料
    downloadSource(item){
      let params = {
        courseId: this.courseId,
        attachmentId: item.id
      }
      /*不能这样使用
      图片会预览 word可以下载 
      但是数据格式未知
      window.open(item.attachmentUrl);*/

      downloadAttachment(params).then(res => {
        // 返回来的数据已经是blob流了
        let blob = res;
        // let blob = new Blob([res]);
        
        // 字符串拼接
        // 比如 XXX.jpg
        let fileName = item.attachmentName;
        let fileUrl = item.attachmentUrl;
        let extName = fileUrl.slice(fileUrl.lastIndexOf("."));
        fileName = fileName + extName;
        console.log(fileName);
        // 伪操作：创建 a （用户不可见）来达到点击下载操作
        const link = document.createElement("a");
        // download 属性规定被下载的超链接目标
        // 下载的文件名称 展示出来的 可以瞎写
        link.download = fileName;
        link.target = '_blank';
        link.style.display = 'none';
        // 创建一个包装后的URL
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        // 脚本自动点击下载
        link.click();
        // 删除包装后的URL
        // 为什么要移除:防止用户多次触发事件 页面DOM节点增多
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
      
    },
    //开始学习按钮操作
    goPlay(courseId,chapterId){
      this.$router.push({
          path:'/course-play/' + courseId + '/' + chapterId
      })
    }
  },
};
</script>

<style scoped>
.courseContainer {
  width: 100%;
  height: 100%;
  background: #f8fafc;
  overflow: hidden;
}
.main {
  margin: 40px auto;
  width: 1200px;
  height: 100%;
}
.courseInfoTop {
  width: 100%;
  height: 200px;
  background-image: url("/image/courseInfobg1920.png");
}
.nav-container {
  width: 1200px;
  margin: 0 auto;
  color: #333333;
  display: flex;
}
/* .chapter-item  .active{
    color: #388FFF;

} */
/* 背景部分开始 */
.courseInfoTop .info-container {
  margin: 0 auto;
  width: 1200px;
  height: 200px;
  color: #ffffff;
  z-index: 5;
}
.route {
  /*margin-left: 50px;*/
  padding-top: 20px;
  display: flex;
  font-size: 14px;
}
.route .route-item {
  margin-right: 10px;
}
.name {
  margin: 30px 0 10px 0px;
  font-size: 24px;
}
.info {
  display: flex;
  /*margin-left: 50px;*/
}
.info .Avat {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.info .Avat img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.teacherName {
  margin: 8px 0 0 8px;
}
.name-item img {
  width: 14px;
  height: 14px;
}
.access {
  margin: 0 0 0 100px;
  display: flex;
}
.access .access-item {
  margin-right: 10px;
  line-height: 60px;
}
/* 背景部分结束 */

/* 导航栏开始 */
.info-nav {
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.course {
  margin: 0 auto;
  width: 1200px;
}
.chapter {
  display: flex;
  font-weight: 600;
  color: #333333;
  margin-left: 50px;
  font-size: 20px;
}
.chapter-item {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  line-height: 80px;
  margin-right: 70px;
  cursor: pointer;
  position: relative;
}
.chapter-item .active1 {
  color: #388fff;
}
.chapter-item .active2 {
  position: absolute;
  width: 70%;
  top: 63px;
  left: calc(30% / 2);
  height: 4px;
  background: #388fff;
  border-radius: 2px;
}

/* 导航栏结束 */
/* 课程介绍开始 */
.introduction {
  /*margin-left: 50px;*/
  /*padding: 20px;*/
  width: 1210px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.desc {
  padding: 20px;
  color: #474747;
  line-height: 35px;
}
.btn {
  float: right;
  margin-top: 10px;
  padding: 0 20px 20px;
}
.btn-item {
  width: 120px;
  height: 40px;
  /*margin: 0 20px 0 0;*/
  padding: 0px;
  border: 0px;
  outline: none;
  color: #f11d1d;
  border-radius: 23px;
  cursor: pointer;
}
.btn .active {
  background: #f11d1d !important;
  color: #ffffff;
  margin-right: 10px;
}
/* 课程介绍结束 */

/* 视频目录开始 */
.video {
  margin: 20px 0;
  padding: 20px;
  width: 1170px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.video .chapterName {
  font-weight: bold;
  font-size: 20px;
  color: #333333;
}
.video .free {
  padding-left: 20px;
  font-size: 14px;
  color: #388fff;
}
.chapterDesc {
  margin: 10px 0;
  font-size: 13px;
  color: #5c5c5c;
}
.video-item {
  height: 40px;
  line-height: 40px;
  padding: 5px 0;
  /*margin: 0 0 10px 0;*/
  border-radius: 8px;
}
.video-item:hover {
  cursor: pointer;
  background: rgba(53, 133, 255, 0.2);
  border-radius: 8px;
  color: #388fff !important;
}
.video-item .shipin {
  color: #333333;
  font-weight: bold;
}
.video-item .chapterName {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.video-itemIcon,
.item-name {
  float: left;
  padding-left: 10px;
}
.btn-learn {
  margin: 5px 5px 0 0;
  float: right;
  right: -100px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  outline: none;
  color: #fff;
  background: #388fff;
  border-radius: 12px;
  cursor: pointer;
}
.clearfloat {
  clear: both;
}
/* 视频目录结束 */
.source {
  margin: 2px 0;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.down {
  margin: 10px auto !important;
  width: 1200px;
  height: 100%;
  padding: 5px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
}
.down:first-child {
  margin: 40px 0 5px 0;
}
.downloadbtn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  background: #388fff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>
