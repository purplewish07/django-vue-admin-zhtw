<template>
<div id="app">
    <ejs-grid :dataSource='data' :editSettings='editSettings' :toolbar='toolbar' height='273px' :actionBegin=actionBegin>
		<!--div :test='test'>{{test}}</div-->
		<e-columns>
		    <e-column field='id' headerText='id' textAlign='Right' :isPrimaryKey='true' :validationRules='orderIDRules' width=100></e-column>
            <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=100></e-column>
            <e-column field='CustomerID' headerText='Customer ID' :validationRules='customerIDRules' width=120></e-column>
            <e-column field='Freight' headerText='Freight' textAlign= 'Right' editType= 'numericedit' width=120 format= 'C2'></e-column>
            <e-column field='ShipCountry' headerText='Ship Country' editType= 'dropdownedit' width=150></e-column>
        </e-columns>
    </ejs-grid>
</div>
</template>
<script>
import Vue from "vue";
import { GridPlugin, Page, Toolbar, Edit } from "@syncfusion/ej2-vue-grids";
//import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
//import { DataManager, WebMethodAdaptor } from '@syncfusion/ej2-data';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import VueCookies from 'vue-cookies'

import { genTree, deepClone } from "@/utils";
import checkPermission from "@/utils/permission";
import {
  getRoutes,
  getAll_Task_list,
  createTask_order,
  deleteTask_order,
  updateTask_order,
} from "@/api/task_list";

Vue.use(GridPlugin);
Vue.use(VueCookies);
export default Vue.extend({
  data() {
return {
  data: new DataManager({
	headers: [{'Authorization': 'Bearer ' + this.$cookies.get('token')}],
	
    //url: "https://ej2services.syncfusion.com/production/web-services/api/Orders",
    url: 'http://192.168.2.3:8000/api/task_system/task_list/',
    
    //adaptor: new UrlAdaptor
    //adaptor: new WebMethodAdaptor
    adaptor: new WebApiAdaptor(),
	crossDomain: true 
	
}),
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  orderIDRules: { required: true },
  customerIDRules: { required: true, minLength: 3 }
};
  },
  provide: {
grid: [Page, Edit, Toolbar]
  },
  created() {
    // Mock: get all routes and work list from server
    //this.getRoutes();
  },
  methods: {
	checkPermission,
    //async getRoutes() {
      //const res = await getRoutes();
      //// this.serviceRoutes = res.data
      //this.routes = genTree(res.data);
    //},
	actionBegin(args){
		if ((args.requestType === 'beginEdit' || args.requestType === 'add' || args.requestType === 'delete')){
			//alert('123');
			alert(checkPermission(['work_update','work_delete']));
		}
	}
  }

});

</script>

<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css';
</style>