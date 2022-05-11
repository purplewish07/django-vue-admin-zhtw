<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
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
                    <e-resource field='RoomId' title='Class' name='Class' :dataSource='test2' textField='Class_Name' idField='ID' 
					groupIDField= 'ClassID' colorField='Color'>
                    </e-resource>
                    <e-resource field='OwnerId' title='Machine' name='Machine' :allowMultiple='allowMultiple' :dataSource='test1'
                    textField='MachineName' idField='ID' groupIDField= 'MachineID' colorField='Color'>
                    </e-resource>
                </e-resources>
            </ejs-schedule>
        </div>
    </div>
</template>


<script>
	import Vue from 'vue';
	//import Vue from 'vue/dist/vue.js';
    import { machineData } from './schedule.js';
    import { SchedulePlugin, TimelineViews, TimelineMonth, RecurrenceEditor } from '@syncfusion/ej2-vue-schedule';
	import { Internationalization } from '@syncfusion/ej2-base';
	import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
	import { MultiSelect } from '@syncfusion/ej2-dropdowns';
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
					<td class="e-textlabel">Owner</td>
					<td colspan="4">
						<input type="text" id="OwnerId" name="OwnerId" class="e-field" style="width: 100%" />
					</td>
				</tr>
				<tr>
					<td colspan="4">
						<div id='RecurrenceEditor'></div>
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
	  }
	});
    export default {
        data () {
			let auth_token = 'Bearer ' + this.$cookies.get('token');
			let ClassDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Class/',
				adaptor: new WebApiAdaptor(),
				crossDomain: true 

			});
			let MachineDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Machine/',
				adaptor: new WebApiAdaptor(),
				crossDomain: true 

			});
			let Mechanical_hoursDataSource = new DataManager({
				headers: [{'Authorization': auth_token }],
				url: 'http://192.168.2.3:8000/api/task_system/Mechanical_hours/',
				adaptor: new WebApiAdaptor(),
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
					byGroupID: false,
                    resources: ['Class', 'Machine']
                },
                allowMultiple: true,
				test1:[{ID: 1, MachineID: 1, MachineName: "MX1", Color: ""},
				 {ID: 2, MachineID: 2, MachineName: "MX2", Color: ""},
				 {ID: 3, MachineID: 3, MachineName: "MX3", Color: ""},
				 {ID: 4, MachineID: 4, MachineName: "MX4", Color: ""},
				 {ID: 5, MachineID: 5, MachineName: "MX5", Color: ""},
				 {ID: 6, MachineID: 6, MachineName: "MX6", Color: ""},
				 {ID: 7, MachineID: 7, MachineName: "MX7", Color: ""},
				 {ID: 8, MachineID: 8, MachineName: "MX8", Color: ""},
				 {ID: 9, MachineID: 9, MachineName: "MX9", Color: ""}],
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
				let scheduleObj = this.$refs.scheduleObj.ej2Instances;
				let startElement = args.element.querySelector('#StartTime');
				if (!startElement.classList.contains('e-datetimepicker')) {
					new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
				}
				let endElement = args.element.querySelector('#EndTime');
				if (!endElement.classList.contains('e-datetimepicker')) {
					new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
				}
				let recurElement = args.element.querySelector('#RecurrenceEditor');
				if (!recurElement.classList.contains('e-recurrenceeditor')) {
					let recurrObject = new RecurrenceEditor({});
					recurrObject.appendTo(recurElement);
					scheduleObj.eventWindow.recurrenceEditor = recurrObject;
				}
				document.getElementById('RecurrenceEditor').style.display = (scheduleObj.currentAction == 'EditOccurrence') ? 'none' : 'block';
			  }
			}
			
        }
    }
</script>