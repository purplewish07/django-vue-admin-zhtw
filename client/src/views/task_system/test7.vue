<template>
<div id="app">
    <ejs-grid :dataSource='data' :editSettings='editSettings' :toolbar='toolbar' height='273px' :actionBegin="actionBegin">
        <!--div :select_id='select_id' :baseUrl='baseUrl'>id={{select_id}}url{{baseUrl}}</div-->
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
export default Vue.extend({
  data() {
return {
  //tableData: [],
  select_id:'',
  //baseUrl:'http://192.168.2.3:8000/api/task_system/task_list',
  data: new DataManager({
	//headers: [{ 'csrftoken': '7QZKT7OIWAeS2bSigKKgRibN6zj61DjM4Csq4ViE9H178nhgp2nlKyX8LJL7Zktu'}],
	//headers: [{accept: "application/json", 'X-CSRFToken': '5PaVgokRReuHBemDd8yEy5KvJudtaZgOCN2rlEj78fidGRsNJzR8BIp5dzlssKub'}],
	headers: [{'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwOTI4NDQyLCJqdGkiOiJiMTM0MWM1NDExYTI0MTk1YmQ4N2EwYzFmMDBlYmNhYiIsInVzZXJfaWQiOjF9.9j8o_7Aa_9fAt5lBcF4SVIjvdz_himVZnoXBm94yzQ8'}],
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
    this.getRoutes();
    this.getAll_Task_list();
  },
  methods: {
	checkPermission,
    async getRoutes() {
      const res = await getRoutes();
      // this.serviceRoutes = res.data
      this.routes = genTree(res.data);
    },
    async getAll_Task_list() {
      //const res = await getAll_Task_list();
      //this.tableData = res.data;
      //this.taskList = res.data;
      
    },
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