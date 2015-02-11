/**
 * Created by chenguanglv on 15/2/10.
 */

var casesApp = angular.module('cases', [
    'ngRoute', 'ui.bootstrap', 'dialogs.main', 'pascalprecht.translate', 'dialogs.default-translations'
]);

casesApp.value('hasLogin', false);
casesApp.constant('page', {
    pageNo: 1,
    pageSize: 10,
    total: 0
});

casesApp.config(['$routeProvider', 'dialogsProvider','$translateProvider',function ($routeProvider,dialogsProvider,$translateProvider) {

    AV.initialize("i2glxgdp97a3lpxxqvdnsm64m2q4qedacpo48ux4a0vb5ja8", "n48oa1mwfpjt7hrnipusfytne06a8c0wyqnattlf9l7yhto9");

    $routeProvider
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'loginController'
        })
        .when('/list', {
            templateUrl: 'template/list.html',
            controller: 'listController'
        })
        .when('/detail', {
            templateUrl: 'template/add.html',
            controller: 'detailController'
        })
        .when('/add', {
            templateUrl: 'template/add.html',
            controller: 'addController'
        })
        .when('/edit', {
            templateUrl: 'template/add.html',
            controller: 'editController'
        })
        .otherwise({
            redirectTo: '/login'
        });

    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    $translateProvider.translations('es',{
        DIALOGS_ERROR: "Error",
        DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
        DIALOGS_CLOSE: "Cerca",
        DIALOGS_PLEASE_WAIT: "Espere por favor",
        DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
        DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
        DIALOGS_PERCENT_COMPLETE: "% Completado",
        DIALOGS_NOTIFICATION: "Notificacion",
        DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
        DIALOGS_CONFIRMATION: "Confirmacion",
        DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
        DIALOGS_OK: "Bueno",
        DIALOGS_YES: "Si",
        DIALOGS_NO: "No"
    });

    $translateProvider.preferredLanguage('en-US');
}]);