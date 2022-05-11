import { DataManager, Query, CustomDataAdaptor, AjaxOption } from '@syncfusion/ej2-data';

let createRequest: Function = (url: string, option: AjaxOption) => {
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            let request: Object = extend({}, option, { httpRequest: xhttp });
            if ((xhttp.status >= 200 && xhttp.status <= 299) || xhttp.status === 304) {
                let data: Object = JSON.parse(xhttp.responseText);
                option.onSuccess(data, request);
            } else {
                option.onFailure(request);
            }
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(option.data);
};

let baseUrl: string = "http://192.168.2.3:8000/api/task_system/task_list/";

new DataManager({
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
    }).executeQuery(new Query().take(8)).then((e) => {
        //e.result will contain the records
    });