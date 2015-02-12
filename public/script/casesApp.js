/**
 * Created by chenguanglv on 15/2/10.
 */

var casesApp = angular.module('cases', [
    'ngRoute', 'ui.bootstrap', 'dialogs.main', 'pascalprecht.translate', 'dialogs.default-translations'
]);

casesApp.value('page', {
    pageNo: 1,
    pageSize: 10,
    total: 0
});

casesApp.config(['$routeProvider', 'dialogsProvider', '$translateProvider', function ($routeProvider, dialogsProvider, $translateProvider) {

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
            redirectTo: '/list'
        });

    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    $translateProvider.translations('zh-CN', {
        DIALOGS_ERROR: "",
        DIALOGS_ERROR_MSG: "",
        DIALOGS_CLOSE: "关闭",
        DIALOGS_PLEASE_WAIT: "",
        DIALOGS_PLEASE_WAIT_ELIPS: "",
        DIALOGS_PLEASE_WAIT_MSG: "",
        DIALOGS_PERCENT_COMPLETE: "",
        DIALOGS_NOTIFICATION: "",
        DIALOGS_NOTIFICATION_MSG: "",
        DIALOGS_CONFIRMATION: "",
        DIALOGS_CONFIRMATION_MSG: "",
        DIALOGS_OK: "确定",
        DIALOGS_YES: "是",
        DIALOGS_NO: "否"
    });

    $translateProvider.preferredLanguage('zh-CN');
}]);

casesApp.run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
    $rootScope.$on('$locationChangeStart', function(){
        var currentUser = AV.User.current();
        if(!currentUser){
            $location.path('/login');
        }
    });
}]);