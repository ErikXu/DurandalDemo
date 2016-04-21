define(['jquery', 'knockout', 'plugins/router', 'bootstrap'], function ($, ko, router) {

    var isAjaxing = ko.observable(false);
    $(document).ajaxStart(function () { isAjaxing(true); })
        .ajaxStop(function () { isAjaxing(false); });

     var routes = [
       { route: ['', 'employee'], title:'员工列表', moduleId: 'viewmodels/employee', nav: true, iconClass: 'fa fa-user'},
 	   { route: 'store', title:"门店列表", moduleId: "viewmodels/store", nav: true, iconClass: "fa fa-line-chart" }
    ];
    
    var vm = {
        router: router,
        isLoading: ko.computed(function () {
            return (router.isNavigating() || isAjaxing());
        }),
        activate: function () {
            router.map(routes).buildNavigationModel().mapUnknownRoutes('shared/viewmodels/not-found');
            return router.activate();
        }
    };

    return vm;
});