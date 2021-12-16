module.exports = {
	// 配置路徑別名
	configureWebpack: {
		devServer: {
			// 調試時允許內網穿透，讓外網的人訪問到本地調試的H5頁面
			disableHostCheck: true
		}
	},
	//productionSourceMap: false,
}
