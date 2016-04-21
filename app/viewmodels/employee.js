define(['jquery', 'knockout', 'knockout.mapping', 'durandal/app', 'toastr'], function ($, ko, mapping, app, toastr) {
    ko.mapping = mapping;

    function getEmployees(){
    	var employees = [
			{id:'00001', name:'张三', desc:'张三的描述'},
			{id:'00002', name:'李四', desc:'李四的描述'},
			{id:'00003', name:'王五', desc:'王五的描述'},
    	];
    	return employees;
    }
    
    var vm = {
    	employees:ko.observableArray(),
        activate: function () {
        	//return getEmployees().then(function(employees){
        	//	vm.employees(employees);
        	//});
        	
        	var employees = getEmployees();
        	vm.employees(employees);
        },
        add: function () {
            app.showDialog('viewmodels/employee-add').then(function (newItem) {
                if (newItem) {
                    //vm.employees.unshift(newItem);
                    vm.employees.push(newItem);
                }
            });
        },
        edit: function (item) {
            var cloneItem = $.extend({}, item);
            app.showDialog('viewmodels/employee-edit', cloneItem).then(function (newItem) {
                if (newItem) {
                    vm.employees.replace(item, newItem);
                }
            });
        },
        del: function (item) {
            var span = $('<span class="label label-warning"></span>').text(item.name);
            app.showMessage('确定要删除 ' + span[0].outerHTML + ' ？', '删除员工', ['是', '否']).then(function (dialogResult) {
                if (dialogResult === '是') {
                    //return countryApi.del(item.id).then(function () {
                    //    vm.employees.remove(item);
                    //    toastr.success('删除成功!');
                    //});
                    vm.employees.remove(item);
                    toastr.success('删除成功!');
                }
                return true;
            });
        }
    };

    return vm;
});