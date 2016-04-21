requirejs.config({
    baseUrl: 'app/',
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'plugins/http': 'shared/http',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'knockout.mapping': '../lib/knockout/mapping/knockout.mapping-latest',
        'knockout.validation': '../lib/knockout/validation/knockout.validation.min',
        'jquery': '../lib/jquery/jquery-2.1.1.min',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'toastr': '../lib/toastr/js/toastr.min',
        'moment': '../lib/moment/moment.min',
        'shared': 'shared'        
    }
});

function customizeDialog(srcDialog) {
    srcDialog.MessageBox.setViewUrl('../shared/views/message-box.html');
    var theContext = srcDialog.getContext();
    theContext.blockoutOpacity = 0.5;
    theContext.compositionComplete = function (child, parent, context) {
        var theDialog = srcDialog.getDialog(context.model);
        theDialog.child = child;
        var $child = $(child);

        $(theDialog.host).css('opacity', 1);
        $child.css('visibility', 'visible').show(0, function () {
            $(this).addClass('in');
        });

        $child.find('.autofocus').first().focus();
    };

    srcDialog.close = function (obj) {
        var theDialog = this.getDialog(obj);
        if (theDialog) {
            var $child = $(theDialog.child);
            $child.removeClass('in');
            var rest = Array.prototype.slice.call(arguments, 1);
            theDialog.close.apply(theDialog, rest);
        }
    };

}

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/dialog', 'jquery', 'knockout', 'toastr', 'knockout.validation'], function (system, app, viewLocator, dialog, $, ko, toastr) {

    system.debug(true);

    app.title = 'XXX系统';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    ko.validation.init({
        decorateElement: true,
        errorClass: 'has-error',
        insertMessages: false
    });

    toastr.options = { closeButton: true };

    app.start().then(function () {
        viewLocator.useConvention();
        customizeDialog(dialog);
        app.setRoot('viewmodels/shell', 'entrance', 'applicationHost');
    });
});