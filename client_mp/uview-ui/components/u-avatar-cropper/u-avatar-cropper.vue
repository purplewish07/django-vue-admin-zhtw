<template>
	<view class="content">
		<view class="cropper-wrapper" :style="{ height: cropperOpt.height + 'px' }">
			<canvas
				class="cropper"
				:disable-scroll="true"
				@touchstart="touchStart"
				@touchmove="touchMove"
				@touchend="touchEnd"
				:style="{ width: cropperOpt.width, height: cropperOpt.height, backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
				canvas-id="cropper"
				id="cropper"
			></canvas>
			<canvas
				class="cropper"
				:disable-scroll="true"
				:style="{
					position: 'fixed',
					top: `-${cropperOpt.width * cropperOpt.pixelRatio}px`,
					left: `-${cropperOpt.height * cropperOpt.pixelRatio}px`,
					width: `${cropperOpt.width * cropperOpt.pixelRatio}px`,
					height: `${cropperOpt.height * cropperOpt.pixelRatio}`
				}"
				canvas-id="targetId"
				id="targetId"
			></canvas>
		</view>
		<view class="cropper-buttons safe-area-padding" :style="{ height: bottomNavHeight + 'px' }">
			<!-- #ifdef H5 -->
			<view class="upload" @tap="uploadTap">選擇圖片</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="upload" @tap="uploadTap">重新選擇</view>
			<!-- #endif -->
			<view class="getCropperImage" @tap="getCropperImage(false)">確定</view>
		</view>
	</view>
</template>

<script>
import WeCropper from './weCropper.js';
export default {
	props: {
		// 裁剪矩形框的樣式，其中可包含的屬性為lineWidth-邊框寬度(單位rpx)，color: 邊框顏色，
		// mask-遮罩顏色，一般設置為一個rgba的透明度，如"rgba(0, 0, 0, 0.35)"
		boundStyle: {
			type: Object,
			default() {
				return {
					lineWidth: 4,
					borderColor: 'rgb(245, 245, 245)',
					mask: 'rgba(0, 0, 0, 0.35)'
				};
			}
		}
		// // 裁剪框寬度，單位rpx
		// rectWidth: {
		// 	type: [String, Number],
		// 	default: 400
		// },
		// // 裁剪框高度，單位rpx
		// rectHeight: {
		// 	type: [String, Number],
		// 	default: 400
		// },
		// // 輸出圖片寬度，單位rpx
		// destWidth: {
		// 	type: [String, Number],
		// 	default: 400
		// },
		// // 輸出圖片高度，單位rpx
		// destHeight: {
		// 	type: [String, Number],
		// 	default: 400
		// },
		// // 輸出的圖片類型，如果發現裁剪的圖片很大，可能是因為設置為了"png"，改成"jpg"即可
		// fileType: {
		// 	type: String,
		// 	default: 'jpg',
		// },
		// // 生成的圖片質量
		// // H5上無效，目前不考慮使用此參數
		// quality: {
		// 	type: [Number, String],
		// 	default: 1
		// }
	},
	data() {
		return {
			// 底部導航的高度
			bottomNavHeight: 50,
			originWidth: 200,
			width: 0,
			height: 0,
			cropperOpt: {
				id: 'cropper',
				targetId: 'targetCropper',
				pixelRatio: 1,
				width: 0,
				height: 0,
				scale: 2.5,
				zoom: 8,
				cut: {
					x: (this.width - this.originWidth) / 2,
					y: (this.height - this.originWidth) / 2,
					width: this.originWidth,
					height: this.originWidth
				},
				boundStyle: {
					lineWidth: uni.upx2px(this.boundStyle.lineWidth),
					mask: this.boundStyle.mask,
					color: this.boundStyle.borderColor
				}
			},
			// 裁剪框和輸出圖片的尺寸，高度默認等於寬度
			// 輸出圖片寬度，單位px
			destWidth: 200,
			// 裁剪框寬度，單位px
			rectWidth: 200,
			// 輸出的圖片類型，如果'png'類型發現裁剪的圖片太大，改成"jpg"即可
			fileType: 'jpg',
			src: '', // 選擇的圖片路徑，用於在點擊確定時，判斷是否選擇了圖片
		};
	},
	onLoad(option) {
		let rectInfo = uni.getSystemInfoSync();
		this.width = rectInfo.windowWidth;
		this.height = rectInfo.windowHeight - this.bottomNavHeight;
		this.cropperOpt.width = this.width;
		this.cropperOpt.height = this.height;
		this.cropperOpt.pixelRatio = rectInfo.pixelRatio;

		if (option.destWidth) this.destWidth = option.destWidth;
		if (option.rectWidth) {
			let rectWidth = Number(option.rectWidth);
			this.cropperOpt.cut = {
				x: (this.width - rectWidth) / 2,
				y: (this.height - rectWidth) / 2,
				width: rectWidth,
				height: rectWidth
			};
		}
		this.rectWidth = option.rectWidth;
		if (option.fileType) this.fileType = option.fileType;
		// 初始化
		this.cropper = new WeCropper(this.cropperOpt)
			.on('ready', ctx => {
				// wecropper is ready for work!
			})
			.on('beforeImageLoad', ctx => {
				// before picture loaded, i can do something
			})
			.on('imageLoad', ctx => {
				// picture loaded
			})
			.on('beforeDraw', (ctx, instance) => {
				// before canvas draw,i can do something
			});
		// 設置導航欄樣式，以免用戶在page.json中沒有設置為黑色背景
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#000000'
		});
		uni.chooseImage({
			count: 1, // 默認9
			sizeType: ['compressed'], // 可以指定是原圖還是壓縮圖，默認二者都有
			sourceType: ['album', 'camera'], // 可以指定來源是相冊還是相機，默認二者都有
			success: res => {
				this.src = res.tempFilePaths[0];
				//  獲取裁剪圖片資源後，給data添加src屬性及其值
				this.cropper.pushOrign(this.src);
			}
		});
	},
	methods: {
		touchStart(e) {
			this.cropper.touchStart(e);
		},
		touchMove(e) {
			this.cropper.touchMove(e);
		},
		touchEnd(e) {
			this.cropper.touchEnd(e);
		},
		getCropperImage(isPre = false) {
			if(!this.src) return this.$u.toast('請先選擇圖片再裁剪');

			let cropper_opt = {
				destHeight: Number(this.destWidth), // uni.canvasToTempFilePath要求這些參數為數值
				destWidth: Number(this.destWidth),
				fileType: this.fileType
			};
			this.cropper.getCropperImage(cropper_opt, (path, err) => {
				if (err) {
					uni.showModal({
						title: '溫馨提示',
						content: err.message
					});
				} else {
					if (isPre) {
						uni.previewImage({
							current: '', // 當前顯示圖片的 http 鏈接
							urls: [path] // 需要預覽的圖片 http 鏈接列表
						});
					} else {
						uni.$emit('uAvatarCropper', path);
						this.$u.route({
							type: 'back'
						});
					}
				}
			});
		},
		uploadTap() {
			const self = this;
			uni.chooseImage({
				count: 1, // 默認9
				sizeType: ['original', 'compressed'], // 可以指定是原圖還是壓縮圖，默認二者都有
				sourceType: ['album', 'camera'], // 可以指定來源是相冊還是相機，默認二者都有
				success: (res) => {
					self.src = res.tempFilePaths[0];
					//  獲取裁剪圖片資源後，給data添加src屬性及其值

					self.cropper.pushOrign(this.src);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.content {
	background: rgba(255, 255, 255, 1);
}

.cropper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 11;
}

.cropper-buttons {
	background-color: #000000;
	color: #eee;
}

.cropper-wrapper {
	position: relative;
	@include vue-flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #000;
}

.cropper-buttons {
	width: 100vw;
	@include vue-flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	font-size: 28rpx;
}

.cropper-buttons .upload,
.cropper-buttons .getCropperImage {
	width: 50%;
	text-align: center;
}

.cropper-buttons .upload {
	text-align: left;
	padding-left: 50rpx;
}

.cropper-buttons .getCropperImage {
	text-align: right;
	padding-right: 50rpx;
}
</style>
