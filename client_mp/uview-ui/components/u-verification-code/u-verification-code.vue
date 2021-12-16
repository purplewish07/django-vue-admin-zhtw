<template>
	<view class="u-code-wrap">
		<!-- 此組件功能由js完成，無需寫html邏輯 -->
	</view>
</template>

<script>
	/**
	 * verificationCode 驗證碼輸入框
	 * @description 考慮到用戶實際發送驗證碼的場景，可能是一個按鈕，也可能是一段文字，提示語各有不同，所以本組件 不提供界面顯示，只提供提示語，由用戶將提示語嵌入到具體的場景
	 * @tutorial https://www.uviewui.com/components/verificationCode.html
	 * @property {Number String} seconds 倒計時所需的秒數（默認60）
	 * @property {String} start-text 開始前的提示語，見官網說明（默認獲取驗證碼）
	 * @property {String} change-text 倒計時期間的提示語，必須帶有字母"x"，見官網說明（默認X秒重新獲取）
	 * @property {String} end-text 倒計結束的提示語，見官網說明（默認重新獲取）
	 * @property {Boolean} keep-running 是否在H5刷新或各端返回再進入時繼續倒計時（默認false）
	 * @event {Function} change 倒計時期間，每秒觸發一次
	 * @event {Function} start 開始倒計時觸發
	 * @event {Function} end 結束倒計時觸發
	 * @example <u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
	 */
	export default {
		name: "u-verification-code",
		props: {
			// 倒計時總秒數
			seconds: {
				type: [String, Number],
				default: 60
			},
			// 尚未開始時提示
			startText: {
				type: String,
				default: '獲取驗證碼'
			},
			// 正在倒計時中的提示
			changeText: {
				type: String,
				default: 'X秒重新獲取'
			},
			// 倒計時結束時的提示
			endText: {
				type: String,
				default: '重新獲取'
			},
			// 是否在H5刷新或各端返回再進入時繼續倒計時
			keepRunning: {
				type: Boolean,
				default: false
			},
			// 為了區分多個頁面，或者一個頁面多個倒計時組件本地存儲的繼續倒計時變了
			uniqueKey: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				secNum: this.seconds,
				timer: null,
				canGetCode: true, // 是否可以執行驗證碼操作
			}
		},
		mounted() {
			this.checkKeepRunning();
		},
		watch: {
			seconds: {
				immediate: true,
				handler(n) {
					this.secNum = n;
				}
			}
		},
		methods: {
			checkKeepRunning() {
				// 獲取上一次退出頁面(H5還包括刷新)時的時間戳，如果沒有上次的保存，此值可能為空
				let lastTimestamp = Number(uni.getStorageSync(this.uniqueKey + '_$uCountDownTimestamp'));
				if(!lastTimestamp) return this.changeEvent(this.startText);
				// 當前秒的時間戳
				let nowTimestamp = Math.floor((+ new Date()) / 1000);
				// 判斷當前的時間戳，是否小於上一次的本該按設定結束，卻提前結束的時間戳
				if(this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
					// 剩餘尚未執行完的倒計秒數
					this.secNum = lastTimestamp - nowTimestamp;
					// 清除本地保存的變量
					uni.removeStorageSync(this.uniqueKey + '_$uCountDownTimestamp');
					// 開始倒計時
					this.start();
				} else {
					// 如果不存在需要繼續上一次的倒計時，執行正常的邏輯
					this.changeEvent(this.startText);
				}
			},
			// 開始倒計時
			start() {
				// 防止快速點擊獲取驗證碼的按鈕而導致內部產生多個定時器導致混亂
				if(this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				this.$emit('start');
				this.canGetCode = false;
				// 這裡放這句，是為了一開始時就提示，否則要等setInterval的1秒後才會有提示
				this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
				this.setTimeToStorage();
				this.timer = setInterval(() => {
					if (--this.secNum) {
						// 用當前倒計時的秒數替換提示字符串中的"x"字母
						this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
					} else {
						clearInterval(this.timer);
						this.timer = null;
						this.changeEvent(this.endText);
						this.secNum = this.seconds;
						this.$emit('end');
						this.canGetCode = true;
					}
				}, 1000);
			},
			// 重置，可以讓用戶再次獲取驗證碼
			reset() {
				this.canGetCode = true;
				clearInterval(this.timer);
				this.secNum = this.seconds;
				this.changeEvent(this.endText);
			},
			changeEvent(text) {
				this.$emit('change', text);
			},
			// 保存時間戳，為了防止倒計時尚未結束，H5刷新或者各端的右上角返回上一頁再進來
			setTimeToStorage() {
				if(!this.keepRunning || !this.timer) return;
				// 記錄當前的時間戳，為了下次進入頁面，如果還在倒計時內的話，繼續倒計時
				// 倒計時尚未結束，結果大於0；倒計時已經開始，就會小於初始值，如果等於初始值，說明沒有開始倒計時，無需處理
				if(this.secNum > 0 && this.secNum <= this.seconds) {
					// 獲取當前時間戳(+ new Date()為特殊寫法)，除以1000變成秒，再去除小數部分
					let nowTimestamp = Math.floor((+ new Date()) / 1000);
					// 將本該結束時候的時間戳保存起來 => 當前時間戳 + 剩餘的秒數
					uni.setStorage({
						key: this.uniqueKey + '_$uCountDownTimestamp',
						data: nowTimestamp + Number(this.secNum)
					})
				}
			}
		},
		// 組件銷毀的時候，清除定時器，否則定時器會繼續存在，系統不會自動清除
		beforeDestroy() {
			this.setTimeToStorage();
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-code-wrap {
		width: 0;
		height: 0;
		position: fixed;
		z-index: -1;
	}
</style>
