<template>
  <div id="app">
<div id='container' style="margin:50px auto 0; width:250px;">
    <br>
	<form id="form-element"  class="form-horizontal">
        <div class="form-group">
		<ejs-dropdowntree id='dropdowntree' :fields='fields' :showCheckBox='true' :enablePersistence ='true' :treeSettings='treeSettings'></ejs-dropdowntree>
		<ejs-treeview id='treeview' :fields="fields" :showCheckBox='true'></ejs-treeview>
		<input type="submit" value="Submit " v-on:click="onClick"/>
        </div>
	</form>
	
</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { DropDownTreePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownTreePlugin);
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
Vue.use(TreeViewPlugin);

var data = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - } Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' },
    { id: 11, name: 'Categories', hasChild: true },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' },
    { id: 15, pid: 11, name: 'Bestselling Songs' },
    { id: 16, name: 'MP3 Albums', hasChild: true },
    { id: 17, pid: 16, name: 'Rock' },
    { id: 18, pid: 16, name: 'Gospel' },
    { id: 19, pid: 16, name: 'Latin Music' },
    { id: 20, pid: 16, name: 'Jazz' },
    { id: 21, name: 'More in Music', hasChild: true },
    { id: 22, pid: 21, name: 'Music Trade-In' },
    { id: 23, pid: 21, name: 'Redeem a Gift Card' },
    { id: 24, pid: 21, name: 'Band T-Shirts' },
];

export default {
  data (){
	return {
	  fields: { dataSource: data, value: 'id', text: 'name', parentID:"pid", hasChildren: 'hasChild' },
	  treeSettings: { autoCheck: true },
	  //checkedNodes:[2,6]
	}
  },
  methods:{
	onClick: function (event) {   
	  //var ele = document.getElementById('dropdowntree'); 
	  //var data=JSON.stringify([ele.itemData]);
	  // checks for incomplete value and alerts the format submit 
	  //if (ele.value !== "") { 
			//alert(ele.value); 
			//alert(ele.Text); 
			//alert(data); 
	  //} 
		var treeObj = document.getElementById('treeview').ej2_instances[0];
		alert("The checked node's id: " + treeObj.checkedNodes); // To alert the checked node's id.
	} 
  }

}

</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
.control_wrapper {
	display: block;
	max-width: 350px;
	max-height: 350px;
	margin: auto;
	overflow: auto;
	border: 1px solid #dddddd;
	border-radius: 3px;
}
</style>