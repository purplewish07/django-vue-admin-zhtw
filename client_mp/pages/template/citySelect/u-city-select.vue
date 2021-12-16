<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
	 close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs"></u-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'change':isChange }">
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in provinces" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="provinceChange">
									<u-icon v-if="isChooseP&&province===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseP">
								<u-cell-item v-for="(item,index) in citys" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="cityChange">
									<u-icon v-if="isChooseC&&city===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>

				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="areaChange">
									<u-icon v-if="isChooseA&&area===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import provinces from "uview-ui/libs/util/province.js";
	import citys from "uview-ui/libs/util/city.js";
	import areas from "uview-ui/libs/util/area.js";
	/**
	 * city-select 省市區級聯選擇器
	 * @property {String Number} z-index 彈出時的z-index值（默認1075）
	 * @property {Boolean} mask-close-able 是否允許通過點擊遮罩關閉Picker（默認true）
	 * @property {String} default-region 默認選中的地區，中文形式
	 * @property {String} default-code 默認選中的地區，編號形式
	 */
	export default {
		name: 'u-city-select',
		props: {
			// 通過雙向綁定控制組件的彈出與收起
			value: {
				type: Boolean,
				default: false
			},
			// 默認顯示的地區，可傳類似["河北省", "秦皇島市", "北戴河區"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// 默認顯示地區的編碼，defaultRegion和areaCode同時存在，areaCode優先，可傳類似["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否允許通過點擊遮罩關閉Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 彈出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //是否已經選擇了省
				province: 0, //省級下標
				provinces: provinces,
				isChooseC: false, //是否已經選擇了市
				city: 0, //市級下標
				citys: citys[0],
				isChooseA: false, //是否已經選擇了區
				area: 0, //區級下標
				areas: areas[0][0],
				tabsIndex: 0,
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "請選擇"
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province]['label'];
					tabsList[1] = {
						name: "請選擇"
					};
				}
				if (this.isChooseC) {
					tabsList[1]['name'] = this.citys[this.city]['label'];
					tabsList[2] = {
						name: "請選擇"
					};
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area]['label'];
				}
				return tabsList;
			},
			uZIndex() {
				// 如果用戶有傳遞z-index值，優先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			init() {
				if (this.areaCode.length == 3) {
					this.setProvince("", this.areaCode[0]);
					this.setCity("", this.areaCode[1]);
					this.setArea("", this.areaCode[2]);
				} else if (this.defaultRegion.length == 3) {
					this.setProvince(this.defaultRegion[0], "");
					this.setCity(this.defaultRegion[1], "");
					this.setArea(this.defaultRegion[2], "");
				};
			},
			setProvince(label = "", value = "") {
				this.provinces.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.provinceChange(k);
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.cityChange(k);
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseA = true;
						this.area = k;
					}
				})
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index) {
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.province = index;
				this.citys = citys[index];
				this.tabsIndex = 1;
			},
			cityChange(index) {
				this.isChooseC = true;
				this.isChooseA = false;
				this.city = index;
				this.areas = areas[this.province][index];
				this.tabsIndex = 2;
			},
			areaChange(index) {
				this.isChooseA = true;
				this.area = index;
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				this.$emit('city-change', result);
				this.close();
			}
		}

	}
</script>
<style lang="scss">
	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 150%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.area-item {
			width: 33.3333333%;
			height: 800rpx;
		}
	}
</style>
