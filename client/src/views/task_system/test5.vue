<template>
<div id="app">
    <ejs-grid :dataSource='data' :editSettings='editSettings' :toolbar='toolbar' height='273px' :actionBegin="actionBegin">
        <div :select_id='select_id' :updateUrl='updateUrl'>id={{select_id}}url{{updateUrl}}</div>
		<e-columns>
		    <e-column field='id' headerText='id' textAlign='Right' :isPrimaryKey='true' width=100></e-column>
            <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=100></e-column>
            <e-column field='CustomerID' headerText='Customer ID' :validationRules='customerIDRules' width=120></e-column>
            <e-column field='Freight' headerText='Freight' textAlign= 'Right' editType= 'numericedit' width=120 format= 'C2'></e-column>
            <e-column field='ShipCountry' headerText='Ship Country' editType= 'dropdownedit' width=150></e-column>
        </e-columns>
    </ejs-grid>
</div>
</template>
<script src="test5.js" type="text/javascript"></script>
<script>
import Vue from "vue";
import { GridPlugin, Page, Toolbar, Edit } from "@syncfusion/ej2-vue-grids";
//import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
//import { DataManager, WebMethodAdaptor } from '@syncfusion/ej2-data';
//import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


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
  updateUrl:'',
  data: new DataManager({
        adaptor: new CustomDataAdaptor({
                getData: function (option: AjaxOption) {
                    createRequest(baseUrl + 'UrlDatasource', option);
                },
                addRecord: function (option: AjaxOption) {
                    createRequest(baseUrl + 'Insert', option);
                },
                updateRecord: function (option: AjaxOption) {
                    createRequest(baseUrl + 'Update', option);
                },
                deleteRecord: function (option: AjaxOption) {
                    createRequest(baseUrl + 'Delete', option);
                }
                // to handle Batch operation
                //batchUpdate: function (option: AjaxOption) {
                //  createRequest(baseUrl + 'Delete', option);  
                //}
            })
    }),
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  //orderIDRules: { required: true },
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
	actionBegin: function (args) { 
		this.select_id = 2;
		//this.updateUrl = "http://192.168.2.3:8000/api/task_system/task_list/" + this.select_id;
		



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