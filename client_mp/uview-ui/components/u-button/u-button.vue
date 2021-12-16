<template>
	<button
		id="u-wave-btn"
		class="u-btn u-line-1 u-fix-ios-appearance"
		:class="[
			'u-size-' + size,
			plain ? 'u-btn--' + type + '--plain' : '',
			loading ? 'u-loading' : '',
			shape == 'circle' ? 'u-round-circle' : '',
			hairLine ? showHairLineBorder : 'u-btn--bold-border',
			'u-btn--' + type,
			disabled ? `u-btn--${type}--disabled` : '',
		]"
		:hover-start-time="Number(hoverStartTime)"
		:hover-stay-time="Number(hoverStayTime)"
		:disabled="disabled"
		:form-type="formType"
		:open-type="openType"
		:app-parameter="appParameter"
		:hover-stop-propagation="hoverStopPropagation"
		:send-message-title="sendMessageTitle"
		send-message-path="sendMessagePath"
		:lang="lang"
		:data-name="dataName"
		:session-from="sessionFrom"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		@getphonenumber="getphonenumber"
		@getuserinfo="getuserinfo"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
		:style="[customStyle, {
			overflow: ripple ? 'hidden' : 'visible'
		}]"
		@tap.stop="click($event)"
		:hover-class="getHoverClass"
		:loading="loading"
	>
		<slot></slot>
		<view
			v-if="ripple"
			class="u-wave-ripple"
			:class="[waveActive ? 'u-wave-active' : '']"
			:style="{
				top: rippleTop + 'px',
				left: rippleLeft + 'px',
				width: fields.targetWidth + 'px',
				height: fields.targetWidth + 'px',
				'background-color': rippleBgColor || 'rgba(0, 0, 0, 0.15)'
			}"
		></view>
	</button>
</template>

<script>
/**
 * button 按鈕
 * @description Button 按鈕
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} size 按鈕的大小
 * @property {Boolean} ripple 是否開啟點擊水波紋效果
 * @property {String} ripple-bg-color 水波紋的背景色，ripple為true時有效
 * @property {String} type 按鈕的樣式類型
 * @property {Boolean} plain 按鈕是否鏤空，背景色透明
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} hair-line 是否顯示按鈕的細邊框(默認true)
 * @property {Boolean} shape 按鈕外觀形狀，見文檔說明
 * @property {Boolean} loading 按鈕名稱前是否帶 loading 圖標(App-nvue 平台，在 ios 上為雪花，Android上為圓圈)
 * @property {String} form-type 用於 <form> 組件，點擊分別會觸發 <form> 組件的 submit/reset 事件
 * @property {String} open-type 開放能力
 * @property {String} data-name 額外傳參參數，用於小程序的data-xxx屬性，通過target.dataset.name獲取
 * @property {String} hover-class 指定按鈕按下去的樣式類。當 hover-class="none" 時，沒有點擊態效果(App-nvue 平台暫不支持)
 * @property {Number} hover-start-time 按住後多久出現點擊態，單位毫秒
 * @property {Number} hover-stay-time 手指鬆開後點擊態保留時間，單位毫秒
 * @property {Object} custom-style 對按鈕的自定義樣式，對像形式，見文檔說明
 * @event {Function} click 按鈕點擊
 * @event {Function} getphonenumber open-type="getPhoneNumber"時有效
 * @event {Function} getuserinfo 用戶點擊該按鈕時，會返回獲取到的用戶信息，從返回參數的detail中獲取到的值同uni.getUserInfo
 * @event {Function} error 當使用開放能力時，發生錯誤的回調
 * @event {Function} opensetting 在打開授權設置頁並關閉後回調
 * @event {Function} launchapp 打開 APP 成功的回調
 * @example <u-button>月落</u-button>
 */
export default {
	name: 'u-button',
	props: {
		// 是否細邊框
		hairLine: {
			type: Boolean,
			default: true
		},
		// 按鈕的預置樣式，default，primary，error，warning，success
		type: {
			type: String,
			default: 'default'
		},
		// 按鈕尺寸，default，medium，mini
		size: {
			type: String,
			default: 'default'
		},
		// 按鈕形狀，circle（兩邊為半圓），square（帶圓角）
		shape: {
			type: String,
			default: 'square'
		},
		// 按鈕是否鏤空
		plain: {
			type: Boolean,
			default: false
		},
		// 是否禁止狀態
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否加載中
		loading: {
			type: Boolean,
			default: false
		},
		// 開放能力，具體請看uniapp穩定關於button組件部分說明
		// https://uniapp.dcloud.io/component/button
		openType: {
			type: String,
			default: ''
		},
		// 用於 <form> 組件，點擊分別會觸發 <form> 組件的 submit/reset 事件
		// 取值為submit（提交表單），reset（重置表單）
		formType: {
			type: String,
			default: ''
		},
		// 打開 APP 時，向 APP 傳遞的參數，open-type=launchApp時有效
		// 只微信小程序、QQ小程序有效
		appParameter: {
			type: String,
			default: ''
		},
		// 指定是否阻止本節點的祖先節點出現點擊態，微信小程序有效
		hoverStopPropagation: {
			type: Boolean,
			default: false
		},
		// 指定返回用戶信息的語言，zh_CN 簡體中文，zh_TW 繁體中文，en 英文。只微信小程序有效
		lang: {
			type: String,
			default: 'en'
		},
		// 會話來源，open-type="contact"時有效。只微信小程序有效
		sessionFrom: {
			type: String,
			default: ''
		},
		// 會話內消息卡片標題，open-type="contact"時有效
		// 默認當前標題，只微信小程序有效
		sendMessageTitle: {
			type: String,
			default: ''
		},
		// 會話內消息卡片點擊跳轉小程序路徑，open-type="contact"時有效
		// 默認當前分享路徑，只微信小程序有效
		sendMessagePath: {
			type: String,
			default: ''
		},
		// 會話內消息卡片圖片，open-type="contact"時有效
		// 默認當前頁面截圖，只微信小程序有效
		sendMessageImg: {
			type: String,
			default: ''
		},
		// 是否顯示會話內消息卡片，設置此參數為 true，用戶進入客服會話會在右下角顯示"可能要發送的小程序"提示，
		// 用戶點擊後可以快速發送小程序消息，open-type="contact"時有效
		showMessageCard: {
			type: Boolean,
			default: false
		},
		// 手指按（觸摸）按鈕時按鈕時的背景顏色
		hoverBgColor: {
			type: String,
			default: ''
		},
		// 水波紋的背景顏色
		rippleBgColor: {
			type: String,
			default: ''
		},
		// 是否開啟水波紋效果
		ripple: {
			type: Boolean,
			default: false
		},
		// 按下的類名
		hoverClass: {
			type: String,
			default: ''
		},
		// 自定義樣式，對像形式
		customStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 額外傳參參數，用於小程序的data-xxx屬性，通過target.dataset.name獲取
		dataName: {
			type: String,
			default: ''
		},
		// 節流，一定時間內只能觸發一次
		throttleTime: {
			type: [String, Number],
			default: 1000
		},
		// 按住後多久出現點擊態，單位毫秒
		hoverStartTime: {
			type: [String, Number],
			default: 20
		},
		// 手指鬆開後點擊態保留時間，單位毫秒
		hoverStayTime: {
			type: [String, Number],
			default: 150
		},
	},
	computed: {
		// 當沒有傳bgColor變量時，按鈕按下去的顏色類名
		getHoverClass() {
			// 如果開啟水波紋效果，則不啟用hover-class效果
			if (this.loading || this.disabled || this.ripple || this.hoverClass) return '';
			let hoverClass = '';
			hoverClass = this.plain ? 'u-' + this.type + '-plain-hover' : 'u-' + this.type + '-hover';
			return hoverClass;
		},
		// 在'primary', 'success', 'error', 'warning'類型下，不顯示邊框，否則會造成四角有毛刺現象
		showHairLineBorder() {
			if (['primary', 'success', 'error', 'warning'].indexOf(this.type) >= 0 && !this.plain) {
				return '';
			} else {
				return 'u-hairline-border';
			}
		}
	},
	data() {
		return {
			rippleTop: 0, // 水波紋的起點Y坐標到按鈕上邊界的距離
			rippleLeft: 0, // 水波紋起點X坐標到按鈕左邊界的距離
			fields: {}, // 波紋按鈕節點信息
			waveActive: false // 激活水波紋
		};
	},
	methods: {
		// 按鈕點擊
		click(e) {
			// 進行節流控制，每this.throttle毫秒內，只在開始處執行
			this.$u.throttle(() => {
				// 如果按鈕時disabled和loading狀態，不觸發水波紋效果
				if (this.loading === true || this.disabled === true) return;
				// 是否開啟水波紋效果
				if (this.ripple) {
					// 每次點擊時，移除上一次的類，再次添加，才能觸發動畫效果
					this.waveActive = false;
					this.$nextTick(function() {
						this.getWaveQuery(e);
					});
				}
				this.$emit('click', e);
			}, this.throttleTime);
		},
		// 查詢按鈕的節點信息
		getWaveQuery(e) {
			this.getElQuery().then(res => {
				// 查詢返回的是一個數組節點
				let data = res[0];
				// 查詢不到節點信息，不操作
				if (!data.width || !data.width) return;
				// 水波紋的最終形態是一個正方形(通過border-radius讓其變為一個圓形)，這裡要保證正方形的邊長等於按鈕的最長邊
				// 最終的方形（變換後的圓形）才能覆蓋整個按鈕
				data.targetWidth = data.height > data.width ? data.height : data.width;
				if (!data.targetWidth) return;
				this.fields = data;
				let touchesX = '',
					touchesY = '';
				// #ifdef MP-BAIDU
				touchesX = e.changedTouches[0].clientX;
				touchesY = e.changedTouches[0].clientY;
				// #endif
				// #ifdef MP-ALIPAY
				touchesX = e.detail.clientX;
				touchesY = e.detail.clientY;
				// #endif
				// #ifndef MP-BAIDU || MP-ALIPAY
				touchesX = e.touches[0].clientX;
				touchesY = e.touches[0].clientY;
				// #endif
				// 獲取觸摸點相對於按鈕上邊和左邊的x和y坐標，原理是通過屏幕的觸摸點（touchesY），減去按鈕的上邊界data.top
				// 但是由於`transform-origin`默認是center，所以這裡再減去半徑才是水波紋view應該的位置
				// 總的來說，就是把水波紋的矩形（變換後的圓形）的中心點，移動到我們的觸摸點位置
				this.rippleTop = touchesY - data.top - data.targetWidth / 2;
				this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
				this.$nextTick(() => {
					this.waveActive = true;
				});
			});
		},
		// 獲取節點信息
		getElQuery() {
			return new Promise(resolve => {
				let queryInfo = '';
				// 獲取元素節點信息，請查看uniapp相關文檔
				// https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
				queryInfo = uni.createSelectorQuery().in(this);
				//#ifdef MP-ALIPAY
				queryInfo = uni.createSelectorQuery();
				//#endif
				queryInfo.select('.u-btn').boundingClientRect();
				queryInfo.exec(data => {
					resolve(data);
				});
			});
		},
		// 下面為對接uniapp官方按鈕開放能力事件回調的對接
		getphonenumber(res) {
			this.$emit('getphonenumber', res);
		},
		getuserinfo(res) {
			this.$emit('getuserinfo', res);
		},
		error(res) {
			this.$emit('error', res);
		},
		opensetting(res) {
			this.$emit('opensetting', res);
		},
		launchapp(res) {
			this.$emit('launchapp', res);
		}
	}
};
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
.u-btn::after {
	border: none;
}

.u-btn {
	position: relative;
	border: 0;
	//border-radius: 10rpx;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	// 避免邊框某些場景可能被「裁剪」，不能設置為hidden
	overflow: visible;
	line-height: 1;
	@include vue-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0 40rpx;
	z-index: 1;
	box-sizing: border-box;
	transition: all 0.15s;
	
	&--bold-border {
		border: 1px solid #ffffff;
	}
	
	&--default {
		color: $u-content-color;
		border-color: #c0c4cc;
		background-color: #ffffff;
	}
	
	&--primary {
		color: #ffffff;
		border-color: $u-type-primary;
		background-color: $u-type-primary;
	}
	
	&--success {
		color: #ffffff;
		border-color: $u-type-success;
		background-color: $u-type-success;
	}
	
	&--error {
		color: #ffffff;
		border-color: $u-type-error;
		background-color: $u-type-error;
	}
	
	&--warning {
		color: #ffffff;
		border-color: $u-type-warning;
		background-color: $u-type-warning;
	}
	
	&--default--disabled {
		color: #ffffff;
		border-color: #e4e7ed;
		background-color: #ffffff;
	}
	
	&--primary--disabled {
		color: #ffffff!important;
		border-color: $u-type-primary-disabled!important;
		background-color: $u-type-primary-disabled!important;
	}
	
	&--success--disabled {
		color: #ffffff!important;
		border-color: $u-type-success-disabled!important;
		background-color: $u-type-success-disabled!important;
	}
	
	&--error--disabled {
		color: #ffffff!important;
		border-color: $u-type-error-disabled!important;
		background-color: $u-type-error-disabled!important;
	}
	
	&--warning--disabled {
		color: #ffffff!important;
		border-color: $u-type-warning-disabled!important;
		background-color: $u-type-warning-disabled!important;
	}
	
	&--primary--plain {
		color: $u-type-primary!important;
		border-color: $u-type-primary-disabled!important;
		background-color: $u-type-primary-light!important;
	}
	
	&--success--plain {
		color: $u-type-success!important;
		border-color: $u-type-success-disabled!important;
		background-color: $u-type-success-light!important;
	}
	
	&--error--plain {
		color: $u-type-error!important;
		border-color: $u-type-error-disabled!important;
		background-color: $u-type-error-light!important;
	}
	
	&--warning--plain {
		color: $u-type-warning!important;
		border-color: $u-type-warning-disabled!important;
		background-color: $u-type-warning-light!important;
	}
}

.u-hairline-border:after {
	content: ' ';
	position: absolute;
	pointer-events: none;
	// 設置為border-box，意味著下面的scale縮小為0.5，實際上縮小的是偽元素的內容（border-box意味著內容不含border）
	box-sizing: border-box;
	// 中心點作為變形(scale())的原點
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	left: 0;
	top: 0;
	width: 199.8%;
	height: 199.7%;
	-webkit-transform: scale(0.5, 0.5);
	transform: scale(0.5, 0.5);
	border: 1px solid currentColor;
	z-index: 1;
}

.u-wave-ripple {
	z-index: 0;
	position: absolute;
	border-radius: 100%;
	background-clip: padding-box;
	pointer-events: none;
	user-select: none;
	transform: scale(0);
	opacity: 1;
	transform-origin: center;
}

.u-wave-ripple.u-wave-active {
	opacity: 0;
	transform: scale(2);
	transition: opacity 1s linear, transform 0.4s linear;
}

.u-round-circle {
	border-radius: 100rpx;
}

.u-round-circle::after {
	border-radius: 100rpx;
}

.u-loading::after {
	background-color: hsla(0, 0%, 100%, 0.35);
}

.u-size-default {
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}

.u-size-medium {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	width: auto;
	font-size: 26rpx;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 80rpx;
}

.u-size-mini {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	width: auto;
	font-size: 22rpx;
	padding-top: 1px;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 20rpx;
}

.u-primary-plain-hover {
	color: #ffffff !important;
	background: $u-type-primary-dark !important;
}

.u-default-plain-hover {
	color: $u-type-primary-dark !important;
	background: $u-type-primary-light !important;
}

.u-success-plain-hover {
	color: #ffffff !important;
	background: $u-type-success-dark !important;
}

.u-warning-plain-hover {
	color: #ffffff !important;
	background: $u-type-warning-dark !important;
}

.u-error-plain-hover {
	color: #ffffff !important;
	background: $u-type-error-dark !important;
}

.u-info-plain-hover {
	color: #ffffff !important;
	background: $u-type-info-dark !important;
}

.u-default-hover {
	color: $u-type-primary-dark !important;
	border-color: $u-type-primary-dark !important;
	background-color: $u-type-primary-light !important;
}

.u-primary-hover {
	background: $u-type-primary-dark !important;
	color: #fff;
}

.u-success-hover {
	background: $u-type-success-dark !important;
	color: #fff;
}

.u-info-hover {
	background: $u-type-info-dark !important;
	color: #fff;
}

.u-warning-hover {
	background: $u-type-warning-dark !important;
	color: #fff;
}

.u-error-hover {
	background: $u-type-error-dark !important;
	color: #fff;
}
</style>
