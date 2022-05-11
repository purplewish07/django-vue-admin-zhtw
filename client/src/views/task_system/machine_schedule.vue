<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';

</style>
<template>
    <div>
        <div id='container'>
            <ejs-schedule ref='scheduleObj' id='Schedule' width='100%' :height='height' :eventSettings='eventSettings'
            :selectedDate='selectedDate' :currentView='currentView' :group='group' :renderCell='onRenderCell'
			:headerRows='headerRows' :workHours='workHours'>
                <e-views>
                    <e-view option='TimelineDay'></e-view>
                    <e-view option='TimelineWeek'></e-view>
                    <e-view option='TimelineMonth'></e-view>
                </e-views>
                <e-resources>
                    <e-resource field='RoomId' title='Room' name='Rooms' :dataSource='roomDataSource' textField='RoomText' idField='Id' groupIDField= 'RoomGroupId' colorField='RoomColor'>
                    </e-resource>
                    <e-resource field='OwnerId' title='Owner' name='Owners' :allowMultiple='allowMultiple' :dataSource='ownerDataSource'
                    textField='OwnerText' idField='Id' groupIDField= 'OwnerGroupId' colorField='OwnerColor'>
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
    import { SchedulePlugin, TimelineViews, TimelineMonth } from '@syncfusion/ej2-vue-schedule';
	import { Internationalization } from '@syncfusion/ej2-base';
    Vue.use(SchedulePlugin);
	//var instance = new Internationalization();
	var dateHeaderTemplate = Vue.component("date-header-template", {
        template: '<div class="date-text">{{getDateHeaderText(data.date)}}</div>',
        data() {
            return {
                data: {}
            };
        },
        methods: {
            getDateHeaderText: function (value) {
                return instance.formatDate(value, { skeleton: 'Ed' });
            }
        }
    });
    export default {
        data () {
            return {
                selectedDate: new Date(2018, 3, 4),
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
                    resources: ['Rooms', 'Owners']
                },
                roomDataSource: [
                    { RoomText: 'MX', Id: 1, RoomGroupId: 1, RoomColor: '#cb6bb2' },
                    { RoomText: 'ME', Id: 2, RoomGroupId: 2, RoomColor: '#56ca85' }
                ],
                allowMultiple: true,
                ownerDataSource: [
                    { OwnerText: 'MX1', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
                    { OwnerText: 'ME1', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
                    { OwnerText: 'MX1', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'ME2', Id: 4, OwnerGroupId: 2, OwnerColor: '#7499e1' },
					{ OwnerText: 'ME3', Id: 4, OwnerGroupId: 2, OwnerColor: '#7499e1' },
					{ OwnerText: 'ME4', Id: 4, OwnerGroupId: 2, OwnerColor: '#7499e1' },
					{ OwnerText: 'ME5', Id: 4, OwnerGroupId: 2, OwnerColor: '#7499e1' },
					{ OwnerText: 'ME6', Id: 4, OwnerGroupId: 2, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX3', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX4', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX5', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX6', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX7', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
					{ OwnerText: 'MX8', Id: 4, OwnerGroupId: 1, OwnerColor: '#7499e1' },
                ],
                eventSettings: { dataSource: machineData },
				workHours: {
					highlight: true,
					start: '08:00',
					end: '17:00'
				},


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
					//var formatter = Globalize.dateFormatter({raw: "EEEE"});
					//var resultText ='<div class="e-header-day">'+ formatter((args.date).getDay()) + '</div>' + args.element.innerHTML; 
					args.element.innerHTML = resultText; 
					
				}
                
            },
			
        }
    }
</script>