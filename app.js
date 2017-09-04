var routerApp = angular.module("routerApp", [
    "ui.bootstrap",
    "ui.bootstrap.tpls",
    "ui.router",
    "ngSanitize",
    "ngAnimate",
    "ngHubic"
]);

routerApp.config(function(OvhProvider) {
    // Set the Application Key (AK):
    OvhProvider.setAppKey("");

    // Set the Application Secret (AS):
    OvhProvider.setAppSecret("");

    // Set the API Base Path
    OvhProvider.setBaseUrl("https://api.hubic.com/1.0");

    // Returns complete data
    OvhProvider.setPreventReturnData(true);

    if (window.location.href.indexOf("access_token") != -1) {
        var access_token = window.location.href.split("#")[2].split("&")[0].split("=")[1];
        OvhProvider.setConsumerKey(access_token);
    }
});

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider

        .state("home", {
            url: "/home",
            templateUrl: "home.html"
        })

        .state("home.ovh", {
            url: "/ovh",
            templateUrl: "home-ovh.html",
            controller: function() {}
        })

        .state("home.hubic", {
            url: "/hubic",
            templateUrl: "home-hubic.html",
            controller: function() {}
        })

        .state("hubic", {
            url: "/hubic",
            templateUrl: "hubic-home.html",
            controller: "hubicController"
        })

        .state("about", {
            url: "/about",
            views: {
                "": {
                    templateUrl: "about.html"
                },
                "columnOne@about": {
                    templateUrl: "about-ovh.html"
                },
                "columnTwo@about": {
                    templateUrl: "about-hubic.html"
                }
            }
        });
});

routerApp.run(function() {
    $.scrollUp({
        // scrollImg: !0,
        // animation: "slide",
    });
});

routerApp.controller('CollapseDemoCtrl', function($scope) {
    $scope.isNavCollapsed = true;

    $('.navbar-collapse li a').click(function() {
        $('.navbar-collapse').collapse("hide");
    });
});
