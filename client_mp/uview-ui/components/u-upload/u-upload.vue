<template>
	<view class="u-upload" v-if="!disabled">
		<view
			v-if="showUploadList"
			class="u-list-item u-preview-wrap"
			v-for="(item, index) in lists"
			:key="index"
			:style="{
				width: $u.addUnit(width),
				height: $u.addUnit(height)
			}"
		>
			<view
				v-if="deletable"
				class="u-delete-icon"
				@tap.stop="deleteItem(index)"
				:style="{
					background: delBgColor
				}"
			>
				<u-icon class="u-icon" :name="delIcon" size="20" :color="delColor"></u-icon>
			</view>
			<u-line-progress
				v-if="showProgress && item.progress > 0 && !item.error"
				:show-percent="false"
				height="16"
				class="u-progress"
				:percent="item.progress"
			></u-line-progress>
			<view @tap.stop="retry(index)" v-if="item.error" class="u-error-btn">點擊重試</view>
			<image @tap.stop="doPreviewImage(item.url || item.path, index)" class="u-preview-image" v-if="!item.isImage" :src="item.url || item.path" :mode="imageMode"></image>
		</view>
		<slot name="file" :file="lists"></slot>
		<view style="display: inline-block;" @tap="selectFile" v-if="maxCount > lists.length">
			<slot name="addBtn"></slot>
			<view
				v-if="!customBtn"
				class="u-list-item u-add-wrap"
				hover-class="u-add-wrap__hover"
				hover-stay-time="150"
				:style="{
					width: $u.addUnit(width),
					height: $u.addUnit(height)
				}"
			>
				<u-icon name="plus" class="u-add-btn" size="40"></u-icon>
				<view class="u-add-tips">{{ uploadText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * upload 圖片上傳
 * @description 該組件用於上傳圖片場景
 * @tutorial https://www.uviewui.com/components/upload.html
 * @property {String} action 服務器上傳地址
 * @property {String Number} max-count 最大選擇圖片的數量（默認99）
 * @property {Boolean} custom-btn 如果需要自定義選擇圖片的按鈕，設置為true（默認false）
 * @property {Boolean} show-progress 是否顯示進度條（默認true）
 * @property {Boolean} disabled 是否啟用(顯示/移倉)組件（默認false）
 * @property {String} image-mode 預覽圖片等顯示模式，可選值為uni的image的mode屬性值（默認aspectFill）
 * @property {String} del-icon 右上角刪除圖標名稱，只能為uView內置圖標
 * @property {String} del-bg-color 右上角關閉按鈕的背景顏色
 * @property {String | Number} index 在各個回調事件中的最後一個參數返回，用於區別是哪一個組件的事件
 * @property {String} del-color 右上角關閉按鈕圖標的顏色
 * @property {Object} header 上傳攜帶的頭信息，對像形式
 * @property {Object} form-data 上傳額外攜帶的參數
 * @property {String} name 上傳文件的字段名，供後端獲取使用（默認file）
 * @property {Array<String>} size-type original 原圖，compressed 壓縮圖，默認二者都有（默認['original', 'compressed']）
 * @property {Array<String>} source-type 選擇圖片的來源，album-從相冊選圖，camera-使用相機，默認二者都有（默認['album', 'camera']）
 * @property {Boolean} preview-full-image	是否可以通過uni.previewImage預覽已選擇的圖片（默認true）
 * @property {Boolean} multiple	是否開啟圖片多選，部分安卓機型不支持（默認true）
 * @property {Boolean} deletable 是否顯示刪除圖片的按鈕（默認true）
 * @property {String Number} max-size 選擇單個文件的最大大小，單位B(byte)，默認不限制（默認Number.MAX_VALUE）
 * @property {Array<Object>} file-list 默認顯示的圖片列表，數組元素為對象，必須提供url屬性
 * @property {Boolean} upload-text 選擇圖片按鈕的提示文字（默認「選擇圖片」）
 * @property {Boolean} auto-upload 選擇完圖片是否自動上傳，見上方說明（默認true）
 * @property {Boolean} show-tips 特殊情況下是否自動提示toast，見上方說明（默認true）
 * @property {Boolean} show-upload-list 是否顯示組件內部的圖片預覽（默認true）
 * @event {Function} on-oversize 圖片大小超出最大允許大小
 * @event {Function} on-preview 全屏預覽圖片時觸發
 * @event {Function} on-remove 移除圖片時觸發
 * @event {Function} on-success 圖片上傳成功時觸發
 * @event {Function} on-change 圖片上傳後，無論成功或者失敗都會觸發
 * @event {Function} on-error 圖片上傳失敗時觸發
 * @event {Function} on-progress 圖片上傳過程中的進度變化過程觸發
 * @event {Function} on-uploaded 所有圖片上傳完畢觸發
 * @event {Function} on-choose-complete 每次選擇圖片後觸發，只是讓外部可以得知每次選擇後，內部的文件列表
 * @example <u-upload :action="action" :file-list="fileList" ></u-upload>
 */
export default {
	name: 'u-upload',
	props: {
		//是否顯示組件自帶的圖片預覽功能
		showUploadList: {
			type: Boolean,
			default: true
		},
		// 後端地址
		action: {
			type: String,
			default: ''
		},
		// 最大上傳數量
		maxCount: {
			type: [String, Number],
			default: 52
		},
		//  是否顯示進度條
		showProgress: {
			type: Boolean,
			default: true
		},
		// 是否啟用
		disabled: {
			type: Boolean,
			default: false
		},
		// 預覽上傳的圖片時的裁剪模式，和image組件mode屬性一致
		imageMode: {
			type: String,
			default: 'aspectFill'
		},
		// 頭部信息
		header: {
			type: Object,
			default() {
				return {};
			}
		},
		// 額外攜帶的參數
		formData: {
			type: Object,
			default() {
				return {};
			}
		},
		// 上傳的文件字段名
		name: {
			type: String,
			default: 'file'
		},
		// 所選的圖片的尺寸, 可選值為original compressed
		sizeType: {
			type: Array,
			default() {
				return ['original', 'compressed'];
			}
		},
		sourceType: {
			type: Array,
			default() {
				return ['album', 'camera'];
			}
		},
		// 是否在點擊預覽圖後展示全屏圖片預覽
		previewFullImage: {
			type: Boolean,
			default: true
		},
		// 是否開啟圖片多選，部分安卓機型不支持
		multiple: {
			type: Boolean,
			default: true
		},
		// 是否展示刪除按鈕
		deletable: {
			type: Boolean,
			default: true
		},
		// 文件大小限制，單位為byte
		maxSize: {
			type: [String, Number],
			default: Number.MAX_VALUE
		},
		// 顯示已上傳的文件列表
		fileList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 上傳區域的提示文字
		uploadText: {
			type: String,
			default: '選擇圖片'
		},
		// 是否自動上傳
		autoUpload: {
			type: Boolean,
			default: true
		},
		// 是否顯示toast消息提示
		showTips: {
			type: Boolean,
			default: true
		},
		// 是否通過slot自定義傳入選擇圖標的按鈕
		customBtn: {
			type: Boolean,
			default: false
		},
		// 內部預覽圖片區域和選擇圖片按鈕的區域寬度
		width: {
			type: [String, Number],
			default: 200
		},
		// 內部預覽圖片區域和選擇圖片按鈕的區域高度
		height: {
			type: [String, Number],
			default: 200
		},
		// 右上角關閉按鈕的背景顏色
		delBgColor: {
			type: String,
			default: '#fa3534'
		},
		// 右上角關閉按鈕的叉號圖標的顏色
		delColor: {
			type: String,
			default: '#ffffff'
		},
		// 右上角刪除圖標名稱，只能為uView內置圖標
		delIcon: {
			type: String,
			default: 'close'
		},
		// 如果上傳後的返回值為json字符串，是否自動轉json
		toJson: {
			type: Boolean,
			default: true
		},
		// 上傳前的鉤子，每個文件上傳前都會執行
		beforeUpload: {
			type: Function,
			default: null
		},
		// 移除文件前的鉤子
		beforeRemove: {
			type: Function,
			default: null
		},
		// 允許上傳的圖片後綴
		limitType:{
			type: Array,
			default() {
				// 支付寶小程序真機選擇圖片的後綴為"image"
				// https://opendocs.alipay.com/mini/api/media-image
				return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'];
			}
		},
		// 在各個回調事件中的最後一個參數返回，用於區別是哪一個組件的事件
		index: {
			type: [Number, String],
			default: ''
		}
	},
	mounted() {},
	data() {
		return {
			lists: [],
			isInCount: true,
			uploading: false
		};
	},
	watch: {
		fileList: {
			immediate: true,
			handler(val) {
				val.map(value => {
					// 首先檢查內部是否已經添加過這張圖片，因為外部綁定了一個對像給fileList的話(對像引用)，進行修改外部fileList
					// 時，會觸發watch，導致重新把原來的圖片再次添加到this.lists
					// 數組的some方法意思是，只要數組元素有任意一個元素條件符合，就返回true，而另一個數組的every方法的意思是數組所有元素都符合條件才返回true
					let tmp = this.lists.some(val => {
						return val.url == value.url;
					})
					// 如果內部沒有這個圖片(tmp為false)，則添加到內部
					!tmp && this.lists.push({ url: value.url, error: false, progress: 100 });
				});
			}
		},
		// 監聽lists的變化，發出事件
		lists(n) {
			this.$emit('on-list-change', n, this.index);
		}
	},
	methods: {
		// 清除列表
		clear() {
			this.lists = [];
		},
		// 重新上傳隊列中上傳失敗的所有文件
		reUpload() {
			this.uploadFile();
		},
		// 選擇圖片
		selectFile() {
			if (this.disabled) return;
			const { name = '', maxCount, multiple, maxSize, sizeType, lists, camera, compressed, maxDuration, sourceType } = this;
			let chooseFile = null;
			const newMaxCount = maxCount - lists.length;
			// 設置為只選擇圖片的時候使用 chooseImage 來實現
			chooseFile = new Promise((resolve, reject) => {
				uni.chooseImage({
					count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
					sourceType: sourceType,
					sizeType,
					success: resolve,
					fail: reject
				});
			});
			chooseFile
				.then(res => {
					let file = null;
					let listOldLength = this.lists.length;
					res.tempFiles.map((val, index) => {
						// 檢查文件後綴是否允許，如果不在this.limitType內，就會返回false
						if(!this.checkFileExt(val)) return ;
						
						// 如果是非多選，index大於等於1或者超出最大限制數量時，不處理
						if (!multiple && index >= 1) return;
						if (val.size > maxSize) {
							this.$emit('on-oversize', val, this.lists, this.index);
							this.showToast('超出允許的文件大小');
						} else {
							if (maxCount <= lists.length) {
								this.$emit('on-exceed', val, this.lists, this.index);
								this.showToast('超出最大允許的文件個數');
								return;
							}
							lists.push({
								url: val.path,
								progress: 0,
								error: false,
								file: val
							});
						}
					});
					// 每次圖片選擇完，拋出一個事件，並將當前內部選擇的圖片數組拋出去
					this.$emit('on-choose-complete', this.lists, this.index);
					if (this.autoUpload) this.uploadFile(listOldLength);
				})
				.catch(error => {
					this.$emit('on-choose-fail', error);
				});
		},
		// 提示用戶消息
		showToast(message, force = false) {
			if (this.showTips || force) {
				uni.showToast({
					title: message,
					icon: 'none'
				});
			}
		},
		// 該方法供用戶通過ref調用，手動上傳
		upload() {
			this.uploadFile();
		},
		// 對失敗的圖片重新上傳
		retry(index) {
			this.lists[index].progress = 0;
			this.lists[index].error = false;
			this.lists[index].response = null;
			uni.showLoading({
				title: '重新上傳'
			});
			this.uploadFile(index);
		},
		// 上傳圖片
		async uploadFile(index = 0) {
			if (this.disabled) return;
			if (this.uploading) return;
			// 全部上傳完成
			if (index >= this.lists.length) {
				this.$emit('on-uploaded', this.lists, this.index);
				return;
			}
			// 檢查是否是已上傳或者正在上傳中
			if (this.lists[index].progress == 100) {
				if (this.autoUpload == false) this.uploadFile(index + 1);
				return;
			}
			// 執行before-upload鉤子
			if(this.beforeUpload && typeof(this.beforeUpload) === 'function') {
				// 執行回調，同時傳入索引和文件列表當作參數
				// 在微信，支付寶等環境(H5正常)，會導致父組件定義的customBack()函數體中的this變成子組件的this
				// 通過bind()方法，綁定父組件的this，讓this.customBack()的this為父組件的上下文
				// 因為upload組件可能會被嵌套在其他組件內，比如u-form，這時this.$parent其實為u-form的this，
				// 非頁面的this，所以這裡需要往上歷遍，一直尋找到最頂端的$parent，這裡用了this.$u.$parent.call(this)
				// 明白意思即可，無需糾結this.$u.$parent.call(this)的細節
				let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))(index, this.lists);
				// 判斷是否返回了promise
				if (!!beforeResponse && typeof beforeResponse.then === 'function') {
					await beforeResponse.then(res => {
						// promise返回成功，不進行動作，繼續上傳
					}).catch(err => {
						// 進入catch回調的話，繼續下一張
						return this.uploadFile(index + 1);
					})
				} else if(beforeResponse === false) {
					// 如果返回false，繼續下一張圖片的上傳
					return this.uploadFile(index + 1);
				} else {
					// 此處為返回"true"的情形，這裡不寫代碼，就跳過此處，繼續執行當前的上傳邏輯
				}
			}
			// 檢查上傳地址
			if (!this.action) {
				this.showToast('請配置上傳地址', true);
				return;
			}
			this.lists[index].error = false;
			this.uploading = true;
			// 創建上傳對像
			const task = uni.uploadFile({
				url: this.action,
				filePath: this.lists[index].url,
				name: this.name,
				formData: this.formData,
				header: this.header,
				success: res => {
					// 判斷是否json字符串，將其轉為json格式
					let data = this.toJson && this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
					if (![200, 201, 204].includes(res.statusCode)) {
						this.uploadError(index, data);
					} else {
						// 上傳成功
						this.lists[index].response = data;
						this.lists[index].progress = 100;
						this.lists[index].error = false;
						this.$emit('on-success', data, index, this.lists, this.index);
					}
				},
				fail: e => {
					this.uploadError(index, e);
				},
				complete: res => {
					uni.hideLoading();
					this.uploading = false;
					this.uploadFile(index + 1);
					this.$emit('on-change', res, index, this.lists, this.index);
				}
			});
			task.onProgressUpdate(res => {
				if (res.progress > 0) {
					this.lists[index].progress = res.progress;
					this.$emit('on-progress', res, index, this.lists, this.index);
				}
			});
		},
		// 上傳失敗
		uploadError(index, err) {
			this.lists[index].progress = 0;
			this.lists[index].error = true;
			this.lists[index].response = null;
			this.$emit('on-error', err, index, this.lists, this.index);
			this.showToast('上傳失敗，請重試');
		},
		// 刪除一個圖片
		deleteItem(index) {
			uni.showModal({
				title: '提示',
				content: '您確定要刪除此項嗎？',
				success: async (res) => {
					if (res.confirm) {
						// 先檢查是否有定義before-remove移除前鉤子
						// 執行before-remove鉤子
						if(this.beforeRemove && typeof(this.beforeRemove) === 'function') {
							// 此處鉤子執行 原理同before-remove參數，見上方註釋
							let beforeResponse = this.beforeRemove.bind(this.$u.$parent.call(this))(index, this.lists);
							// 判斷是否返回了promise
							if (!!beforeResponse && typeof beforeResponse.then === 'function') {
								await beforeResponse.then(res => {
									// promise返回成功，不進行動作，繼續上傳
									this.handlerDeleteItem(index);
								}).catch(err => {
									// 如果進入promise的reject，終止刪除操作
									this.showToast('已終止移除');
								})
							} else if(beforeResponse === false) {
								// 返回false，終止刪除
								this.showToast('已終止移除');
							} else {
								// 如果返回true，執行刪除操作
								this.handlerDeleteItem(index);
							}
						} else {
							// 如果不存在before-remove鉤子，
							this.handlerDeleteItem(index);
						}
					}
				}
			});
		},
		// 執行移除圖片的動作，上方代碼只是判斷是否可以移除
		handlerDeleteItem(index) {
			// 如果文件正在上傳中，終止上傳任務，進度在0 < progress < 100則意味著正在上傳
			if (this.lists[index].process < 100 && this.lists[index].process > 0) {
				typeof this.lists[index].uploadTask != 'undefined' && this.lists[index].uploadTask.abort();
			}
			this.lists.splice(index, 1);
			this.$forceUpdate();
			this.$emit('on-remove', index, this.lists, this.index);
			this.showToast('移除成功');
		},
		// 用戶通過ref手動的形式，移除一張圖片
		remove(index) {
			// 判斷索引的合法範圍
			if (index >= 0 && index < this.lists.length) {
				this.lists.splice(index, 1);
				this.$emit('on-list-change', this.lists, this.index);
			}
		},
		// 預覽圖片
		doPreviewImage(url, index) {
			if (!this.previewFullImage) return;
			const images = this.lists.map(item => item.url || item.path);
			uni.previewImage({
				urls: images,
				current: url,
				success: () => {
					this.$emit('on-preview', url, this.lists, this.index);
				},
				fail: () => {
					uni.showToast({
						title: '預覽圖片失敗',
						icon: 'none'
					});
				}
			});
		},
		// 判斷文件後綴是否允許
		checkFileExt(file) {
			// 檢查是否在允許的後綴中
			let noArrowExt = false;
			// 獲取後綴名
			let fileExt = '';
			const reg = /.+\./;
			// 如果是H5，需要從name中判斷
			// #ifdef H5
			fileExt = file.name.replace(reg, "").toLowerCase();
			// #endif
			// 非H5，需要從path中讀取後綴
			// #ifndef H5
			fileExt = file.path.replace(reg, "").toLowerCase();
			// #endif
			// 使用數組的some方法，只要符合limitType中的一個，就返回true
			noArrowExt = this.limitType.some(ext => {
				// 轉為小寫
				return ext.toLowerCase() === fileExt;
			})
			if(!noArrowExt) this.showToast(`不允許選擇${fileExt}格式的文件`);
			return noArrowExt;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-upload {
	@include vue-flex;
	flex-wrap: wrap;
	align-items: center;
}

.u-list-item {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	margin: 10rpx;
	background: rgb(244, 245, 246);
	position: relative;
	border-radius: 10rpx;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	align-items: center;
	justify-content: center;
}

.u-preview-wrap {
	border: 1px solid rgb(235, 236, 238);
}

.u-add-wrap {
	flex-direction: column;
	color: $u-content-color;
	font-size: 26rpx;
}

.u-add-tips {
	margin-top: 20rpx;
	line-height: 40rpx;
}

.u-add-wrap__hover {
	background-color: rgb(235, 236, 238);
}

.u-preview-image {
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
}

.u-delete-icon {
	position: absolute;
	top: 10rpx;
	right: 10rpx;
	z-index: 10;
	background-color: $u-type-error;
	border-radius: 100rpx;
	width: 44rpx;
	height: 44rpx;
	@include vue-flex;
	align-items: center;
	justify-content: center;
}

.u-icon {
	@include vue-flex;
	align-items: center;
	justify-content: center;
}

.u-progress {
	position: absolute;
	bottom: 10rpx;
	left: 8rpx;
	right: 8rpx;
	z-index: 9;
	width: auto;
}

.u-error-btn {
	color: #ffffff;
	background-color: $u-type-error;
	font-size: 20rpx;
	padding: 4px 0;
	text-align: center;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9;
	line-height: 1;
}
</style>
