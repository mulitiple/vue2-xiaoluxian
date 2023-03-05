export default{
    state:{
      token: localStorage.getItem('token') ||'', // 确定用户的唯一身份
      userInfo:{  // 用户信息
         id:'',  //用户id
         avatar:'', // 用户头像
         nickName:'', //用户昵称
      },
      userStatus: false
    },
    getters:{},
    mutations:{
      setUser(state,token){
        if(token){
          // 给vuex赋值
          state.token = token;
          // 赋值登录状态
          state.userStatus = true;
          // 给本地存储赋值
          localStorage.setItem("token",token)
        }
      },
      setUserInfo(state,userInfo){
        // 获取用户信息赋值
        state.userInfo = userInfo;
        // 赋值登录状态
        state.userStatus = true;
      }
    },
    actions:{},
}
