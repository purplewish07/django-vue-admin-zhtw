<p align="center">
    <img alt="logo" src="https://uviewui.com/common/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uView</h3>
<h3 align="center">多平台快速開發的UI框架</h3>


## 說明

uView UI，是[uni-app](https://uniapp.dcloud.io/)生態優秀的UI框架，全面的組件和便捷的工具會讓您信手拈來，如魚得水

## 特性

- 兼容安卓，iOS，微信小程序，H5，QQ小程序，百度小程序，支付寶小程序，頭條小程序
- 60+精選組件，功能豐富，多端兼容，讓您快速集成，開箱即用
- 眾多貼心的JS利器，讓您飛鏢在手，召之即來，百步穿楊
- 眾多的常用頁面和佈局，讓您專注邏輯，事半功倍
- 詳盡的文檔支持，現代化的演示效果
- 按需引入，精簡打包體積


## 安裝

```bash
# npm方式安裝
npm i uview-ui
```

## 快速上手

1. `main.js`引入uView庫
```js
// main.js
import uView from 'uview-ui';
Vue.use(uView);
```

2. `App.vue`引入基礎樣式(注意style標籤需聲明scss屬性支持)
```css
/* App.vue */
<style lang="scss">
@import "uview-ui/index.scss";
</style>
```

3. `uni.scss`引入全局scss變量文件
```css
/* uni.scss */
@import "uview-ui/theme.scss";
```

4. `pages.json`配置easycom規則(按需引入)

```js
// pages.json
{
	"easycom": {
		// npm安裝的方式不需要前面的"@/"，下載安裝的方式需要"@/"
		// npm安裝方式
		"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
		// 下載安裝方式
		// "^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
	},
	// 此為本身已有的內容
	"pages": [
		// ......
	]
}
```

請通過[快速上手](https://uviewui.com/components/quickstart.html)瞭解更詳細的內容 

## 使用方法
配置easycom規則後，自動按需引入，無需`import`組件，直接引用即可。

```html
<template>
	<u-button>按鈕</u-button>
</template>
```

請通過[快速上手](https://uviewui.com/components/quickstart.html)瞭解更詳細的內容 

## 鏈接

- [官方文檔](https://uviewui.com/)
- [更新日誌](https://uviewui.com/components/changelog.html)
- [升級指南](https://uviewui.com/components/changelog.html)
- [關於我們](https://uviewui.com/cooperation/about.html)

## 預覽

您可以通過**微信**掃碼，查看最佳的演示效果。
<br>
<br>
<img src="https://uviewui.com/common/weixin_mini_qrcode.png" width="220" height="220" >

<!-- ## 捐贈uView的研發

uView文檔和源碼全部開源免費，如果您認為uView幫到了您的開發工作，您可以捐贈uView的研發工作，捐贈無門檻，哪怕是一杯可樂也好(相信這比打賞主播更有意義)。

<img src="https://uviewui.com/common/wechat.png" width="220" >
<img style="margin-left: 100px;" src="https://uviewui.com/common/alipay.png" width="220" >
 -->
## 版權信息
uView遵循[MIT](https://en.wikipedia.org/wiki/MIT_License)開源協議，意味著您無需支付任何費用，也無需授權，即可將uView應用到您的產品中。
