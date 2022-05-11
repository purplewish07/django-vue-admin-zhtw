<!-- test schedule -->
<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css';

.e-schedule .e-timeline-view .e-date-header-wrap, .e-schedule .e-timeline-month-view .e-date-header-wrap {
    font-size: 16px;
}
</style>
<template>
    <div>
        <div id='container'>
            <ejs-schedule ref='scheduleObj' id='Schedule' width='100%' :height='height' :eventSettings='eventSettings'
            :currentView='currentView' :group='group' :renderCell='onRenderCell' 
			:headerRows='headerRows' :workHours='workHours'
			:editorTemplate='editorTemplate' :popupOpen='onPopupOpen'>
                <e-views>
                    <e-view option='TimelineDay'></e-view>
                    <e-view option='TimelineWeek'></e-view>
                    <e-view option='TimelineMonth'></e-view>
                </e-views>
                <e-resources>
                    <e-resource field='ClassID' title='Class' name='Class' :allowMultiple=allowMultiple :dataSource='test2' textField='Class_Name' idField='ID' 
					 colorField='Color'>
                    </e-resource>
                    <e-resource field='MachineID' title='Machine' name='Machine' :allowMultiple=allowMultiple :dataSource='test1'
                    textField='MachineName' idField='ID' groupIDField= 'ClassID' colorField='Color'>
                    </e-resource>
                </e-resources>
            </ejs-schedule>
        </div>
    </div>
</template>


<script>
	import Vue from 'vue';
	//import Vue from 'vue/dist/vue.js';
	import { SchedulePlugin, TimelineViews, TimelineMonth ,RecurrenceEditor} from '@syncfusion/ej2-vue-schedule';
	import { Internationalization } from '@syncfusion/ej2-base';
	import { DataManager, DRFApiAdaptor } from '@syncfusion/ej2-data';
	import { MultiSelect, CheckBoxSelection ,DropDownTree} from '@syncfusion/ej2-dropdowns';
	MultiSelect.Inject(CheckBoxSelection);
	//import { TreeView } from "@syncfusion/ej2-navigations";
	//MultiSelect.Inject(TreeView);
	import { DateTimePicker } from '@syncfusion/ej2-calendars';
	
	import VueCookies from 'vue-cookies';
	
    Vue.use(SchedulePlugin);
	Vue.use(VueCookies);
	//var instance = new Internationalization();
	
	var editorTemplateVue = Vue.component('editorTemplate', {
	  template: `<table class="custom-event-editor" width="100%" cellpadding="5">
			<tbody>
				<tr>
					<td class="e-textlabel">Summary</td>
					<td colspan="4">
						<input id="Subject" class="e-field e-input" type="text" value="" name="Subject" style="width: 100%" />
					</td>
				</tr>
				<tr>
				<td class="e-textlabel">From</td>
					<td colspan="4">
						<input id="StartTime" class="e-field" type="text" name="StartTime" />
					</td>
				</tr>
				<tr>
					<td class="e-textlabel">To</td>
					<td colspan="4">
						<input id="EndTime" class="e-field" type="text" name="EndTime" />
					</td>
				</tr>
				<tr>
				<td class="e-textlabel"></td>
					<td colspan="4">
						<div id='RecurrenceEditor'></div>
					</td>
				</tr>
				<tr>
					<td class="e-textlabel">站別</td>
					<td colspan="4">
						<input type="text" id="ClassID" name="ClassID" class="e-field" style="width: 100%" />
					</td>
				</tr>
				<tr>
					<td class="e-textlabel">機台</td>
					<td colspan="4">
						<input type="text" id="MachineID" name="MachineID" class="e-field" style="width: 100%" />
					</td>
				</tr>
				<tr>
					<td class="e-textlabel">機台</td>
					<td colspan="4">
						<input type="text" id="MachineID2" name="MachineID2" class="e-field" style="width: 100%" :actionComplete=actionComplete />
					</td>
				</tr>
				<tr>
					<td class="e-textlabel">Reason</td>
					<td colspan="4">
						<textarea id="Description" class="e-field e-input" name="Description" rows="3" cols="50" style="width: 100%; height: 60px !important; resize: vertical"></textarea>
					</td>
				</tr>
			</tbody>
		</table>`,
		data() {
			return {
			  data: {}
			};
		},
		methods:{
			actionComplete: function (e) {
				
				//console.log("Before modified the result: " + e.result.length);
				alert(e.result.length);
				
			}
		}
	});

    export default {
        data () {
			let auth_token = 'Bearer ' + this.$cookies.get('token');
			let ClassDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Class/',
				adaptor: new DRFApiAdaptor(),
				crossDomain: true 

			});
			let MachineDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Machine/',
				adaptor: new DRFApiAdaptor(),
				crossDomain: true 

			});
			let Mechanical_hoursDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Mechanical_hours/',
				adaptor: new DRFApiAdaptor(),
				crossDomain: true 

			});
            return {
                //selectedDate: new Date(2018, 3, 4),
                currentView: 'TimelineMonth',
				headerRows: [
					{ option: 'Week' },
					{ option: 'Date' },
					{ option: 'Hour' }
				],
				dateHeaderTemplate: function () {
                    return { template: dateHeaderTemplate }
                },
				height: 'auto',
                group: {
					//byGroupID: false,
                    resources: ['Class', 'Machine']
                },
                allowMultiple: true,
				test1:[
				 {ID: 1, ClassID: 1, MachineName: "MX1", Color: ""},
				 {ID: 2, ClassID: 1, MachineName: "MX2", Color: ""},
				 {ID: 3, ClassID: 1, MachineName: "MX3", Color: ""},
				 {ID: 4, ClassID: 2, MachineName: "MX4", Color: ""},
				 {ID: 5, ClassID: 2, MachineName: "MX5", Color: ""},
				 {ID: 6, ClassID: 2, MachineName: "MX6", Color: ""},
				 {ID: 7, ClassID: 2, MachineName: "MX7", Color: ""},
				 {ID: 8, ClassID: 2, MachineName: "MX8", Color: ""},
				 {ID: 9, ClassID: 2, MachineName: "MX9", Color: ""}],
				test2:[{Class_Name: 'MX', ID: 1, ClassID: 1, Color: ""},
				{Class_Name: 'MA', ID: 2, ClassID: 2, Color: ""}],
                eventSettings: { dataSource: Mechanical_hoursDataSource },
				ClassDataSource: ClassDataSource ,
				MachineDataSource: MachineDataSource,
				workHours: {
					highlight: true,
					start: '08:00',
					end: '17:00'
				},
				editorTemplate: function(e) {
					return {
					  template: editorTemplateVue
					};
				}


            }
        },
        provide: {
            schedule: [TimelineViews, TimelineMonth]
        },
        methods: {
            onRenderCell(args) {
				if (args.elementType == 'resourceGroupCells' && args.element.className.indexOf('e-work-hours') > 0) {
                    args.element.style.background = "#FAFAE3";
                }
				if (args.elementType == 'resourceGroupCells' ) {
					let weekEnds = [0, 6];
                    if (weekEnds.indexOf((args.date).getDay()) >= 0) {
                        args.element.style.background = "#f44336";
                    }
                }
                if (args.elementType == 'workCells' || args.elementType == 'monthCells' || args.elementType === 'dateHeader') {
                    let weekEnds = [0, 6];
                    if (weekEnds.indexOf((args.date).getDay()) >= 0) {
                        args.element.style.background = "#f44336";
                    }
                }
				//let scheduleObj = this.$refs.ScheduleObj.ej2Instances; 
				//var view = this.$refs.ScheduleObj.currentView; 
				//let view = this.$refs.currentView
				//let scheduleObj = this.$refs.ScheduleObj;
				//let view = scheduleObj
				let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
				var view = scheduleObj.currentView;
				if(args.elementType === 'dateHeader' && view ==='TimelineMonth' ) {
					
					var date_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
					var resultText ='<div class="e-header-day">'+ date_list[(args.date).getDay()] + '</div>' + args.element.innerHTML; 
					args.element.innerHTML = resultText; 
					
				}
                
            },
			onPopupOpen: function(args) {
			  if (args.type === 'Editor') {
				let startElement = args.element.querySelector('#StartTime');
				if (!startElement.classList.contains('e-datetimepicker')) {
				  new DateTimePicker(
					{ value: new Date(startElement.value) || new Date() },
					startElement
				  );
				}
				let endElement = args.element.querySelector('#EndTime');
				if (!endElement.classList.contains('e-datetimepicker')) {
				  new DateTimePicker(
					{ value: new Date(endElement.value) || new Date() },
					endElement
				  );
				}
				let scheduleObj = this.$refs.scheduleObj.ej2Instances;
				let recurElement = args.element.querySelector('#RecurrenceEditor');
				if (!recurElement.classList.contains('e-recurrenceeditor')) {
					let recurrObject = new RecurrenceEditor({});
					recurrObject.appendTo(recurElement);
					scheduleObj.eventWindow.recurrenceEditor = recurrObject;
				}
				document.getElementById('RecurrenceEditor').style.display = (scheduleObj.currentAction == 'EditOccurrence') ? 'none' : 'block';
				let ClassElement = args.element.querySelector('#ClassID');
				if (!ClassElement.classList.contains('e-multiselect')) {
					
				  let multiSelectObject = new MultiSelect({
					placeholder: 'Choose a Class',
					fields: { text: 'Class_Name', value: 'ClassID' },
					dataSource: this.test2,
					//value: [args.data.ClassID], 
				  });
				  
				  multiSelectObject.appendTo(ClassElement);
				}
				let MachineElement = args.element.querySelector('#MachineID');
				if (!MachineElement.classList.contains('e-multiselect')) {
				  let multiSelectObject = new MultiSelect({
					placeholder: 'Choose a Machine',
					fields: { groupBy:'ClassID', text: 'MachineName', value: 'ID'},
					dataSource: this.test1,
					//value: [args.data.MachineID], // default value
					mode:"CheckBox",
				  });
				  multiSelectObject.appendTo(MachineElement);
				  
				}
				let Machine2Element = args.element.querySelector('#MachineID2');
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
				if (!Machine2Element.classList.contains('e-ddt')) {
				  let treemultiSelectObject = new DropDownTree({
					placeholder: 'Choose a Machine',
					//fields: {  text: 'MachineName', value: 'ID', dataSource: data,parentValue:"pid", hasChildren: 'hasChild'},
					
					//value: [args.data.ID],
					//treeSettings: { autoCheck: true },
					
					fields: { dataSource: data, value: 'id', text: 'name', parentValue:"pid", hasChildren: 'hasChild' },
					treeSettings: { autoCheck: true },
					showCheckBox: true,
					//value: [args.data.MachineID2],
				  });
				  treemultiSelectObject.appendTo(Machine2Element);
				  Machine2Element.setAttribute('name', 'MachineID2');
				  
				}
				
				

			  }
			},


			
        }
    }
</script>