module.exports = {
	publicPath:'./',
	lintOnSave:false,
	devServer: {
		open:true,
		// 只在开发阶段有用 要想打包 还得配置.env.development   .env.production
		proxy:{
			'/api':{
				target:'http://testapi.xuexiluxian.cn'
			}
		},
		disableHostCheck: true
	}
}