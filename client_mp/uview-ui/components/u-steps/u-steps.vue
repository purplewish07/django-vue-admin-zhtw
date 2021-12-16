<template>
	<view class="">
		<view
			class="u-steps"
			:style="{
				flexDirection: direction
			}"
		>
			<view class="u-steps__item" 
				:class="['u-steps__item--' + direction]" 
				v-for="(item, index) in list" :key="index"
			>
				<view
					class="u-steps__item__num"
					v-if="mode == 'number'"
					:style="{
						backgroundColor: current < index ? 'transparent' : activeColor,
						borderColor: current < index ? unActiveColor : activeColor
					}"
				>
					<text v-if="current < index" :style="{
						color: current < index ? unActiveColor : activeColor,
					}">
						{{ index + 1 }}
					</text>
					<u-icon v-else size="22" color="#ffffff" :name="icon"></u-icon>
				</view>
				<view class="u-steps__item__dot" v-if="mode == 'dot'" :style="{ 
					backgroundColor: index <= current ? activeColor : unActiveColor 
				}"></view>
				<text class="u-line-1" :style="{ 
					color: index <= current ? activeColor : unActiveColor,
				}" :class="['u-steps__item__text--' + direction]">
					{{ item.name }}
				</text>
				<view class="u-steps__item__line" :class="['u-steps__item__line--' + mode]" v-if="index < list.length - 1">
					<u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * steps 步驟條
 * @description 該組件一般用於完成一個任務要分幾個步驟，標識目前處於第幾步的場景。
 * @tutorial https://www.uviewui.com/components/steps.html
 * @property {String} mode 設置模式（默認dot）
 * @property {Array} list 數軸條數據，數組。具體見上方示例
 * @property {String} type type主題（默認primary）
 * @property {String} direction row-橫向，column-豎向（默認row）
 * @property {Number String} current 設置當前處於第幾步
 * @property {String} active-color 已完成步驟的激活顏色，如設置，type值會失效
 * @property {String} un-active-color 未激活的顏色，用於表示未完成步驟的顏色（默認#606266）
 * @example <u-steps :list="numList" active-color="#fa3534"></u-steps>
 */
export default {
	name: 'u-steps',
	props: {
		// 步驟條的類型，dot|number
		mode: {
			type: String,
			default: 'dot'
		},
		// 步驟條的數據
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 主題類型, primary|success|info|warning|error
		type: {
			type: String,
			default: 'primary'
		},
		// 當前哪一步是激活的
		current: {
			type: [Number, String],
			default: 0
		},
		// 激活步驟的顏色
		activeColor: {
			type: String,
			default: '#2979ff'
		},
		// 未激活的顏色
		unActiveColor: {
			type: String,
			default: '#909399'
		},
		// 自定義圖標
		icon: {
			type: String,
			default: 'checkmark'
		},
		// step的排列方向，row-橫向，column-豎向
		direction: {
			type: String,
			default: 'row'
		}
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

$u-steps-item-number-width: 44rpx;
$u-steps-item-dot-width: 20rpx;

.u-steps {
	@include vue-flex;
	
	.u-steps__item {
		flex: 1;
		text-align: center;
		position: relative;
		min-width: 100rpx;
		font-size: 26rpx;
		color: #8799a3;
		@include vue-flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
		&--row {
			@include vue-flex;
			flex-direction: column;
			
			.u-steps__item__line {
				position: absolute;
				z-index: 0;
				left: 75%;
				width: 50%;
				
				&--dot {
					top: calc(#{$u-steps-item-dot-width} / 2);
				}
				
				&--number {
					top: calc(#{$u-steps-item-number-width} / 2);
				}
			}
		}
		
		&--column {
			@include vue-flex;
			flex-direction: row;
			justify-content: flex-start;
			min-height: 120rpx;
			
			.u-steps__item__line {
				position: absolute;
				z-index: 0;
				height: 50%;
				top: 75%;
				
				&--dot {
					left: calc(#{$u-steps-item-dot-width} / 2);
				}
				
				&--number {
					left: calc(#{$u-steps-item-number-width} / 2);
				}
			}
		}
		
		&__num {
			@include vue-flex;
			align-items: center;
			justify-content: center;
			width: $u-steps-item-number-width;
			height: $u-steps-item-number-width;
			border: 1px solid #8799a3;
			border-radius: 50%;
			overflow: hidden;
		}
		
		&__dot {
			width: $u-steps-item-dot-width;
			height: $u-steps-item-dot-width;
			@include vue-flex;
			border-radius: 50%;
		}
		
		&__text--row {
			margin-top: 14rpx;
		}
		
		&__text--column {
			margin-left: 14rpx;
		}
	}
}
</style>
