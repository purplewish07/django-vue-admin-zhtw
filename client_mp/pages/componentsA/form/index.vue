<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
				<u-input :border="border" placeholder="請輸入姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性別" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="請選擇性別" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="簡介" prop="intro">
				<u-input type="textarea" :border="border" placeholder="請填寫簡介" v-model="model.intro" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密碼" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="請輸入密碼"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="確認密碼" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="請確認密碼"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="水果品種" label-width="150" prop="likeFruit">
				<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="結算方式" prop="payType" label-width="150">
				<u-radio-group v-model="radio" @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地區" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="請選擇地區" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="商品類型" prop="goodsType" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="請選擇商品類型" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition" label="手機號碼" prop="phone" label-width="150">
				<u-input :border="border" placeholder="請輸入手機號" v-model="model.phone" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="驗證碼" prop="code" label-width="150">
				<u-input :border="border" placeholder="請輸入驗證碼" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<!-- 此處switch的slot為right，如果不填寫slot名，也即<u-switch v-model="model.remember"></u-switch>，將會左對齊 -->
			<u-form-item :label-position="labelPosition" label="記住密碼" prop="remember" label-width="150">
				<u-switch v-model="model.remember" slot="right"></u-switch>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上傳圖片" prop="photo" label-width="150">
				<u-upload width="160" height="160"></u-upload>
			</u-form-item>
		</u-form>
		<view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾選代表同意uView的版權協議
			</view>
		</view>
		<u-button @click="submit">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">label對齊方式</view>
				<u-subsection vibrateShort :list="['左邊', '上方']" @change="labelPositionChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">邊框</view>
				<u-subsection vibrateShort :current="borderCurrent" :list="['顯示', '隱藏']" @change="borderChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">radio、checkbox樣式</view>
				<u-subsection vibrateShort :list="['自適應', '換行', '50%寬度']" @change="radioCheckboxChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">錯誤提示方式</view>
				<u-subsection vibrateShort :list="['message', 'toast', '下劃線', '輸入框']" @change="errorChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			model: {
				name: '',
				sex: '',
				likeFruit: '',
				intro: '',
				payType: '支付寶',
				agreement: false,
				region: '',
				goodsType: '',
				phone: '',
				code: '',
				password: '',
				rePassword: '',
				remember: false,
				photo: ''
			},
			selectList: [
				{
					value: '電子產品',
					label: '電子產品'
				},
				{
					value: '服裝',
					label: '服裝'
				},
				{
					value: '工藝品',
					label: '工藝品'
				}
			],
			rules: {
				name: [
					{
						required: true,
						message: '請輸入姓名',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 5,
						message: '姓名長度在3到5個字符',
						trigger: ['change','blur'],
					},
					{
						// 此為同步驗證，可以直接返回true或者false，如果是異步驗證，稍微不同，見下方說明
						validator: (rule, value, callback) => {
							// 調用uView自帶的js驗證規則，詳見：https://www.uviewui.com/js/test.html
							return this.$u.test.chinese(value);
						},
						message: '姓名必須為中文',
						// 觸發器可以同時用blur和change，二者之間用英文逗號隔開
						trigger: ['change','blur'],
					},
					// 異步驗證，用途：比如用戶註冊時輸入完賬號，後端檢查賬號是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 異步驗證需要通過調用callback()，並且在裡面拋出new Error()
					// 	// 拋出的內容為需要提示的信息，和其他方式的message屬性的提示一樣
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果驗證出錯，需要在callback()拋出new Error('錯誤提示信息')
					// 			if(res.error) {
					// 				callback(new Error('姓名重複'));
					// 			} else {
					// 				// 如果沒有錯誤，也要執行callback()回調
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				],
				sex: [
					{
						required: true,
						message: '請選擇性別',
						trigger: 'change'
					},
				],
				intro: [
					{
						required: true,
						message: '請填寫簡介'
					},
					{
						min: 5,
						message: '簡介不能少於5個字',
						trigger: 'change' ,
					},
					// 正則校驗示例，此處用正則校驗是否中文，此處僅為示例，因為uView有this.$u.test.chinese可以判斷是否中文
					{
						pattern: /^[\u4e00-\u9fa5]+$/gi,
						message: '簡介只能為中文',
						trigger: 'change',
					},
				],
				likeFruit: [
					{
						required: true,
						message: '請選擇您喜歡的水果',
						trigger: 'change',
						type: 'array',
					}
				],
				payType: [
					{
						required: true,
						message: '請選擇任意一種支付方式',
						trigger: 'change',
					}
				],
				region: [
					{
						required: true,
						message: '請選擇地區',
						trigger: 'change',
					}
				],
				goodsType: [
					{
						required: true,
						message: '請選擇商品類型',
						trigger: 'change',
					}
				],
				phone: [
					{
						required: true,
						message: '請輸入手機號',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 調用uView自帶的js驗證規則，詳見：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手機號碼不正確',
						// 觸發器可以同時用blur和change，二者之間用英文逗號隔開
						trigger: ['change','blur'],
					}
				],
				code: [
					{
						required: true,
						message: '請輸入驗證碼',
						trigger: ['change','blur'],
					},
					{
						type: 'number',
						message: '驗證碼只能為數字',
						trigger: ['change','blur'],
					}
				],
				password: [
					{
						required: true,
						message: '請輸入密碼',
						trigger: ['change','blur'],
					},
					{
						// 正則不能含有兩邊的引號
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同時含有字母和數字，長度在6-12之間',
						trigger: ['change','blur'],
					}
				],
				rePassword: [
					{
						required: true,
						message: '請重新輸入密碼',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return value === this.model.password;
						},
						message: '兩次輸入的密碼不相等',
						trigger: ['change','blur'],
					}
				],
			},
			border: false,
			check: false,
			selectStatus: 'close',
			checkboxList: [
				{
					name: '荔枝',
					checked: false,
					disabled: false
				},
				{
					name: '香蕉',
					checked: false,
					disabled: false
				},
				{
					name: '橙子',
					checked: false,
					disabled: false
				},
				{
					name: '草莓',
					checked: false,
					disabled: false
				}
			],
			radioList: [
				{
					name: '支付寶',
					checked: true,
					disabled: false
				},
				{
					name: '微信',
					checked: false,
					disabled: false
				},
				{
					name: '銀聯',
					checked: false,
					disabled: false
				},
				{
					name: '現金',
					checked: false,
					disabled: false
				}
			],
			radio: '支付寶',
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			],
			actionSheetShow: false,
			pickerShow: false,
			selectShow: false,
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			labelPosition: 'left',
			codeTips: '',
			errorType: ['message'],
		};
	},
	onLoad() {

	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if(!this.model.agreement) return this.$u.toast('請勾選協議');
					console.log('驗證通過');
				} else {
					console.log('驗證失敗');
				}
			});
		},
		// 點擊actionSheet回調
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		// checkbox選擇發生變化
		checkboxGroupChange(e) {
			this.model.likeFruit = e;
		},
		// radio選擇發生變化
		radioGroupChange(e) {
			this.model.payType = e;
		},
		// 勾選版權協議
		checkboxChange(e) {
			this.model.agreement = e.value;
		},
		// 選擇地區回調
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		// 選擇商品類型回調
		selectConfirm(e) {
			this.model.goodsType = '';
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			})
		},
		borderChange(index) {
			this.border = !index;
		},
		radioCheckboxChange(index) {
			if(index == 0) {
				this.radioCheckWrap = false;
				this.radioCheckWidth = 'auto';
			} else if(index == 1) {
				this.radioCheckWrap = true;
				this.radioCheckWidth = 'auto';
			} else if(index == 2) {
				this.radioCheckWrap = false;
				this.radioCheckWidth = '50%';
			}
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'top';
		},
		codeChange(text) {
			this.codeTips = text;
		},
		// 獲取驗證碼
		getCode() {
			if(this.$refs.uCode.canGetCode) {
				// 模擬向後端請求驗證碼
				uni.showLoading({
					title: '正在獲取驗證碼',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading();
					// 這裡此提示會被this.start()方法中的提示覆蓋
					this.$u.toast('驗證碼已發送');
					// 通知驗證碼組件內部開始倒計時
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒計時結束後再發送');
			}
		},
		errorChange(index) {
			if(index == 0) this.errorType = ['message'];
			if(index == 1) this.errorType = ['toast'];
			if(index == 2) this.errorType = ['border-bottom'];
			if(index == 3) this.errorType = ['border'];
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
</style>
