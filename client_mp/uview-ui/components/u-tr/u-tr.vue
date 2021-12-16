<template>
	<view class="u-tr">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * tr 表格行標籤
	 * @description 表格組件一般用於展示大量結構化數據的場景（搭配<u-table>使用）
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @example <u-tr></u-tr>
	 */
	export default {
		name: "u-tr",
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-tr {
		@include vue-flex;
	}
</style>
