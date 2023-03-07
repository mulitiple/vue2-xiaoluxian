module.exports = {
	lintOnSave:false,
	devServer: {
		open:true,
		proxy:{
			'/api':{
				target:'http://testapi.xuexiluxian.cn'
			}
		},
		disableHostCheck: true
	}
}