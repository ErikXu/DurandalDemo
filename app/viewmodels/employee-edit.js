define(['knockout', 'knockout.validation', 'plugins/dialog', 'toastr'], function (ko, validation, dialog, toastr) {
    ko.validation = validation;
    var group;

    // ReSharper disable once InconsistentNaming
    function Employee(item) {
        var self = this;
        self.id = ko.observable(item && item.id).extend({ required: true });
        self.name = ko.observable(item && item.name).extend({ required: true });
        self.desc = ko.observable(item && item.desc).extend({ required: true });
    }

    Employee.prototype.toJS = function () {
        var self = this;
        var result = {
            id: self.id(),
            name: self.name(),
            desc: self.desc()
        };
        return result;
    };

    var vm = {
        employee: ko.observable(),
        activate: function (item) {
                var employee = new Employee(item);
                vm.employee(employee);
                group = ko.validation.group(employee);
                group.showAllMessages(false);
        },
        save: function () {
            if (group().length === 0) {
                //return employeeApi.edit(vm.employee().toJS()).then(function (response) {
                //    toastr.success('更新成功!');
                //    dialog.close(vm, response);
                //});
                var employee = vm.employee().toJS();
                dialog.close(vm, employee);
                toastr.success('更新成功');
            } else {
                group.showAllMessages(true);
                toastr.warning('输入有误！');
                return true;
            }
        },
        close: function () {
            dialog.close(vm);
        }
    };

    return vm;
});