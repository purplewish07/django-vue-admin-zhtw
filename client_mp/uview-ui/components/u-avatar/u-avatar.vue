<template>
	<view class="u-avatar" :style="[wrapStyle]" @tap="click">
		<image
			@error="loadError"
			:style="[imgStyle]"
			class="u-avatar__img"
			v-if="!uText && avatar"
			:src="avatar" 
			:mode="imgMode"
		></image>
		<text class="u-line-1" v-else-if="uText" :style="{
			fontSize: '38rpx'
		}">{{uText}}</text>
		<slot v-else></slot>
		<view class="u-avatar__sex" v-if="showSex" :class="['u-avatar__sex--' + sexIcon]" :style="[uSexStyle]">
			<u-icon :name="sexIcon" size="20"></u-icon>
		</view>
		<view class="u-avatar__level" v-if="showLevel" :style="[uLevelStyle]">
			<u-icon :name="levelIcon" size="20"></u-icon>
		</view>
	</view>
</template>

<script>
	let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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";
	/**
	 * avatar 頭像
	 * @description 本組件一般用於展示頭像的地方，如個人中心，或者評論列表頁的用戶頭像展示等場所。
	 * @tutorial https://www.uviewui.com/components/avatar.html
	 * @property {String} bg-color 背景顏色，一般顯示文字時用（默認#ffffff）
	 * @property {String} src 頭像路徑，如加載失敗，將會顯示默認頭像
	 * @property {String Number} size 頭像尺寸，可以為指定字符串(large, default, mini)，或者數值，單位rpx（默認default）
	 * @property {String} mode 顯示類型，見上方說明（默認circle）
	 * @property {String} sex-icon 性別圖標，man-男，woman-女（默認man）
	 * @property {String} level-icon 等級圖標（默認level）
	 * @property {String} sex-bg-color 性別圖標背景顏色
	 * @property {String} level-bg-color 等級圖標背景顏色
	 * @property {String} show-sex 是否顯示性別圖標（默認false）
	 * @property {String} show-level 是否顯示等級圖標（默認false）
	 * @property {String} img-mode 頭像圖片的裁剪類型，與uni的image組件的mode參數一致，如效果達不到需求，可嘗試傳widthFix值（默認aspectFill）
	 * @property {String} index 用戶傳遞的標識符值，如果是列表循環，可穿v-for的index值
	 * @event {Function} click 頭像被點擊
	 * @example <u-avatar :src="src"></u-avatar>
	 */
	export default {
		name: 'u-avatar',
		props: {
			// 背景顏色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// 頭像路徑
			src: {
				type: String,
				default: ''
			},
			// 尺寸，large-大，default-中等，mini-小，如果為數值，則單位為rpx
			// 寬度等於高度
			size: {
				type: [String, Number],
				default: 'default'
			},
			// 頭像模型，square-帶圓角方形，circle-圓形
			mode: {
				type: String,
				default: 'circle'
			},
			// 文字內容
			text: {
				type: String,
				default: ''
			},
			// 圖片的裁剪模型
			imgMode: {
				type: String,
				default: 'aspectFill'
			},
			// 標識符
			index: {
				type: [String, Number],
				default: ''
			},
			// 右上角性別角標，man-男，woman-女
			sexIcon: {
				type: String,
				default: 'man'
			},
			// 右下角的等級圖標
			levelIcon: {
				type: String,
				default: 'level'
			},
			// 右下角等級圖標背景顏色
			levelBgColor: {
				type: String,
				default: ''
			},
			// 右上角性別圖標的背景顏色
			sexBgColor: {
				type: String,
				default: ''
			},
			// 是否顯示性別圖標
			showSex: {
				type: Boolean,
				default: false
			},
			// 是否顯示等級圖標
			showLevel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				error: false,
				// 頭像的地址，因為如果加載錯誤，需要賦值為默認圖片，props值無法修改，所以需要一個中間值
                avatar: this.src ? this.src : base64Avatar, 
			}
		},
        watch: {
            src(n) {
                // 用戶可能會在頭像加載失敗時，再次修改頭像值，所以需要重新賦值
                if(!n) {
					// 如果傳入null或者''，或者undefined，顯示默認頭像
					this.avatar = base64Avatar;
					this.error = true;
				} else {
					this.avatar = n;
					this.error = false;
				}
            }
        },
		computed: {
			wrapStyle() {
				let style = {};  
				style.height = this.size == 'large' ? '120rpx' : this.size == 'default' ?
				'90rpx' : this.size == 'mini' ? '70rpx' : this.size + 'rpx';
				style.width = style.height;
				style.flex = `0 0 ${style.height}`;
				style.backgroundColor = this.bgColor;
				style.borderRadius = this.mode == 'circle' ? '500px' : '5px';
				if(this.text) style.padding = `0 6rpx`;
				return style;
			},
			imgStyle() {
				let style = {};
				style.borderRadius = this.mode == 'circle' ? '500px' : '5px';
				return style;
			},
			// 取字符串的第一個字符
			uText() {
				return String(this.text)[0];
			},
			// 性別圖標的自定義樣式
			uSexStyle() {
				let style = {};
				if(this.sexBgColor) style.backgroundColor = this.sexBgColor;
				return style;
			},
			// 等級圖標的自定義樣式
			uLevelStyle() {
				let style = {};
				if(this.levelBgColor) style.backgroundColor = this.levelBgColor;
				return style;
			}
		},
		methods: {
			// 圖片加載錯誤時，顯示默認頭像
			loadError() {
				this.error = true;
                this.avatar = base64Avatar;
			},
			click() {
				this.$emit('click', this.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-avatar {
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: $u-content-color;
		border-radius: 10px;
		position: relative;
		
		&__img {
			width: 100%;
			height: 100%;
		}
		
		&__sex {
			position: absolute;
			width: 32rpx;
			color: #ffffff;
			height: 32rpx;
			@include vue-flex;
			justify-content: center;
			align-items: center;
			border-radius: 100rpx;
			top: 5%;
			z-index: 1;
			right: -7%;
			border: 1px #ffffff solid;
			
			&--man {
				background-color: $u-type-primary;
			}
			
			&--woman {
				background-color: $u-type-error;
			}
			
			&--none {
				background-color: $u-type-warning;
			}
		}
		
		&__level {
			position: absolute;
			width: 32rpx;
			color: #ffffff;
			height: 32rpx;
			@include vue-flex;
			justify-content: center;
			align-items: center;
			border-radius: 100rpx;
			bottom: 5%; 
			z-index: 1;
			right: -7%;
			border: 1px #ffffff solid;
			background-color: $u-type-warning;
		}
	}
</style>
