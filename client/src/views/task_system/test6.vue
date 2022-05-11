<template>
<div id="app">
    <ejs-button v-on:click.native="btnClick">Play</ejs-button>
    <ejs-grid>
        <e-columns>
            <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=120 ></e-column>
            <e-column field='CustomerID' headerText='Customer ID' textAlign='Right' width=120 ></e-column>
            <e-column field='EmployeeID' headerText='Employee ID' textAlign='Right' width=120 ></e-column>
            <e-column field='ShipCountry' headerText='Ship Country' textAlign='Right' width=120 ></e-column>
        </e-columns>
    </ejs-grid>
</div>
</template>
<script>
import Vue from "vue";
import { GridPlugin } from "@syncfusion/ej2-vue-grids";
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import { Ajax } from '@syncfusion/ej2-base';

Vue.use(GridPlugin);
Vue.use(ButtonPlugin);

export default Vue.extend({
  data() {
return {
  data: {}
};
  },
  methods:{
   btnClick: function (args){
    var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0]; // Grid instance
    var ajax = new Ajax("http://192.168.2.3:8000/api/task_system/task_list/", "GET");
	//ajax.beforSend = function(xhr){
          //  xhr.RequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwOTI4NDQyLCJqdGkiOiJiMTM0MWM1NDExYTI0MTk1YmQ4N2EwYzFmMDBlYmNhYiIsInVzZXJfaWQiOjF9.9j8o_7Aa_9fAt5lBcF4SVIjvdz_himVZnoXBm94yzQ8');

        //};
    ajax.send();
    ajax.onSuccess = function (result) {
    grid.dataSource = JSON.parse(result);
    };
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