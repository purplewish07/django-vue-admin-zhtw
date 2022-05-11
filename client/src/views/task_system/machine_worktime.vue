<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-pivotview/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-pivotview/styles/material.css";
</style>

<template>
<div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :editSettings="editSettings"> </ejs-pivotview>
</div>
</template>

<script>
import Vue from "vue";
import { PivotViewPlugin } from "@syncfusion/ej2-vue-pivotview";
//import { pivot_flatdata } from './pivot_flatdata.js';

Vue.use(PivotViewPlugin);

export default {
  data () {
return {
dataSourceSettings: {
        dataSource: getPivotData(),
        expandAll: true,
        columns: [{ name: 'Week'}, { name: 'Date' }],
        values: [{ name: 'Hours', caption: 'Hours' }],
        rows: [{ name: 'Class' }, { name: 'machineName' }],
        filters: [],
		showHeaderWhenEmpty: false
      },
  height: '100%',
  editSettings: { allowEditing: true, allowInlineEditing: true }
}
  }
}
function getPivotData() {
  var pivotData = [
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX7','Hours':12},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':52,'Date':'2021/12/20','Class':'ME','machineName':'ME4','Hours':8},

	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX7','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':52,'Date':'2021/12/21','Class':'ME','machineName':'ME4','Hours':8},
	
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX7','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':52,'Date':'2021/12/22','Class':'ME','machineName':'ME4','Hours':8},
	
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX7','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':52,'Date':'2021/12/23','Class':'ME','machineName':'ME4','Hours':8},
	
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX7','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':52,'Date':'2021/12/24','Class':'ME','machineName':'ME4','Hours':8},
	
	
	
	
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX1','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX2','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX3','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX4','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX5','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX6','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX7','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX8','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX9','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX10','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX11','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX12','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX13','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'MX','machineName':'MX14','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'ME','machineName':'ME1','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'ME','machineName':'ME2','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'ME','machineName':'ME3','Hours':8},
	{'Week':53,'Date':'2021/12/27','Class':'ME','machineName':'ME4','Hours':8},
	
]
  return pivotData;
}
</script>





{% endraw %}