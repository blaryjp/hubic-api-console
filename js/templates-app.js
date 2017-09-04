angular.module('templates-app', ['api/api.complexType.tpl.html', 'api/api.simpleType.tpl.html', 'api/api.tpl.html']);

angular.module("api/api.complexType.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("api/api.complexType.tpl.html",
    "<p class=\"text-muted\">{{ param.description || '/' }}</p>\n" +
    "\n" +
    "<table class=\"table table-condensed\">\n" +
    "    <tbody>\n" +
    "        <tr data-ng-repeat=\"param in param.modelProperties\">\n" +
    "\n" +
    "            <!-- param name -->\n" +
    "            <td>{{param.name}}</td>\n" +
    "\n" +
    "            <!-- can be again a complex type -->\n" +
    "            <td data-ng-if=\"param.isModel && !param.isEnum\">\n" +
    "                <div data-ng-include=\"'api/api.complexType.tpl.html'\"></div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- classic or enum -->\n" +
    "            <td data-ng-if=\"!param.isModel || (param.isModel && param.isEnum)\">\n" +
    "                <div data-ng-include=\"'api/api.simpleType.tpl.html'\"></div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- type -->\n" +
    "            <td>{{param.dataType}}</td>\n" +
    "\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>");
}]);

angular.module("api/api.simpleType.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("api/api.simpleType.tpl.html",
    "<div data-ng-switch=\"param.dataType\">\n" +
    "\n" +
    "    <div data-ng-switch-when=\"boolean\">\n" +
    "        <div class=\"btn-group\" data-ng-init=\"param.required ? param.value = false : param.value = undefined\">\n" +
    "            <label class=\"btn btn-default input-sm fs12\" data-ng-model=\"param.value\" btn-radio=\"true\">true</label>\n" +
    "            <label class=\"btn btn-default input-sm fs12\" data-ng-model=\"param.value\" btn-radio=\"false\">false</label>\n" +
    "            <label class=\"btn btn-default input-sm fs12\" data-ng-if=\"!param.required\" data-ng-model=\"param.value\" btn-radio=\"undefined\">undefined</label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-ng-switch-default>\n" +
    "\n" +
    "        <!-- default: string -->\n" +
    "        <div data-ng-if=\"!param.isModel\">\n" +
    "\n" +
    "            <!-- value required -->\n" +
    "            <input type=\"text\" name=\"{{param.name}}\" id=\"{{param.name}}\" class=\"form-control input-sm\"\n" +
    "                   data-ng-if=\"param.required\"\n" +
    "                   data-ng-model=\"param.value\"\n" +
    "                   required />\n" +
    "\n" +
    "            <!-- else, can be undefined, null, empty string -->\n" +
    "            <div data-ng-if=\"!param.required\" class=\"input-group\" data-ng-init=\"param.inputMode = 'input';\">\n" +
    "                <input type=\"text\" name=\"{{param.name}}\" id=\"{{param.name}}\" class=\"form-control input-sm\"\n" +
    "                       data-ng-disabled=\"param.inputMode !== 'input'\" placeholder=\"{{ param.inputMode !== 'input' ? param.inputMode : '' }}\"\n" +
    "                       data-ng-model=\"param.value\"\n" +
    "                       data-ng-change=\"checkUndefined(param)\" />\n" +
    "                <div class=\"input-group-btn\" data-ng-class=\"{'open': param.dropdownOpen}\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default dropdown-toggle input-sm fs12\" data-ng-click=\"param.dropdownOpen = !param.dropdownOpen\"><span class=\"glyphicon glyphicon glyphicon-cog\"></span></button>\n" +
    "                    <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">\n" +
    "                        <li><a href=\"\" data-ng-click=\"param.inputMode = 'input'; param.value = undefined; param.dropdownOpen = false;\">Input</a></li>\n" +
    "                        <li><a href=\"\" data-ng-click=\"param.inputMode = 'null';  param.value = null;      param.dropdownOpen = false;\"><i>null</i></a></li>\n" +
    "                        <li><a href=\"\" data-ng-click=\"param.inputMode = 'empty'; param.value = '';        param.dropdownOpen = false;\"><i>empty string</i></a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- else, can be an enum  -->\n" +
    "        <div data-ng-if=\"param.isModel && param.isEnum\">\n" +
    "\n" +
    "            <select data-ng-options=\"value for value in param.enum.enum\"\n" +
    "                    data-ng-model=\"param.value\"\n" +
    "                    data-ng-change=\"checkUndefined(param)\"\n" +
    "                    data-ng-required=\"param.required\"\n" +
    "                    class=\"form-control input-sm\">\n" +
    "                <option value=\"\"></option>\n" +
    "            </select>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("api/api.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("api/api.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "\n" +
    "        <ul id=\"root-list\" class=\"list-unstyled\">\n" +
    "            <li class=\"panel\" data-ng-repeat=\"api in apiList.apis | orderBy:'path' track by api.path\">\n" +
    "\n" +
    "                <!-- header -->\n" +
    "                <div class=\"panel-heading clearfix\">\n" +
    "                    <a href=\"\" class=\"pull-left\" data-ng-click=\"toggleRootApi(api)\">\n" +
    "                        <h2 class=\"open-sans-light no-space\">{{ api.path}}</h2>\n" +
    "                    </a>\n" +
    "                    <span class=\"loading top-space-m10 left-space-m20\" data-ng-if=\"api.loading\"></span>\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <input type=\"text\" class=\"form-control input-sm api-search-input\" placeholder=\"Filter...\"\n" +
    "                            data-ng-model=\"api.filter\" data-ng-init=\"api.filter = ''\" data-ng-if=\"api.visible && !api.loading && !api.viewRAW\" />\n" +
    "                        <button type=\"button\" class=\"btn btn-link api-view-btn\"\n" +
    "                                data-ng-click=\"collapseAll(api)\"\n" +
    "                                data-ng-if=\"api.visible && !api.loading && !api.viewRAW\">Collapse all</button>\n" +
    "                        <button type=\"button\" class=\"btn btn-link api-view-btn\" data-ng-click=\"toggleRootApiRAW(api)\">RAW</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- view RAW -->\n" +
    "                <div class=\"panel-body\" data-ng-if=\"api.visible && !api.loading && api.viewRAW\">\n" +
    "                    <div data-jsonview=\"api.original\" class=\"well well-sm\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- body -->\n" +
    "                <div class=\"panel-body\" data-ng-show=\"api.visible && !api.loading && !api.viewRAW\">\n" +
    "\n" +
    "                    <div class=\"alert alert-info\" data-ng-if=\"api.filter && !(api.subApis.apis | filter:{'path': api.filter}).length\">No results.</div>\n" +
    "\n" +
    "                    <div class=\"panel-group\" role=\"tablist\">\n" +
    "                        <div class=\"panel panel-default subapi-item\" data-ng-repeat=\"subApi in api.subApis.apis | filter:{'path': api.filter}\">\n" +
    "                            <div class=\"panel-heading\" role=\"tab\">\n" +
    "                                <h4 class=\"panel-title\">\n" +
    "                                    <a href=\"\" data-ng-click=\"toggleSubApi(subApi, $event)\">\n" +
    "                                        <span class=\"label httpcode\" data-ng-class=\"subApi.operation.httpMethod\">{{ subApi.operation.httpMethod }}</span>\n" +
    "                                        <span class=\"subapi-title-path open-sans fs16 middle\" data-ng-bind-html=\"subApi.path | prettypath\"></span>\n" +
    "                                        <span class=\"label normal left-space-m10\" style=\"font-size: .6em;\"\n" +
    "                                              data-ng-class=\"'label-' + subApi.operation.apiStatus.value\"\n" +
    "                                              data-ng-if=\"subApi.operation.apiStatus.value !== 'PRODUCTION'\">\n" +
    "                                        {{ subApi.operation.apiStatus.value }}\n" +
    "                                    </span>\n" +
    "                                    <i class=\"glyphicon glyphicon glyphicon-globe left-space-m10 middle text-muted\" title=\"Public access (no authentication required)\" data-ng-if=\"subApi.operation.noAuthentication\"></i>\n" +
    "                                    <span class=\"pull-right fs14 top-space-m2 text-muted hidden-xs\">\n" +
    "                                        {{ subApi.description }}\n" +
    "                                    </span>\n" +
    "                                </a>\n" +
    "                            </h4>\n" +
    "                        </div>\n" +
    "                        <div class=\"panel-collapse collapse in\" data-ng-if=\"subApi.isOpen\">\n" +
    "                            <div class=\"panel-body\">\n" +
    "\n" +
    "                                <p class=\"italic\">{{ subApi.operation.description}}</p>\n" +
    "\n" +
    "                                <p data-ng-if=\"subApi.operation.apiStatus.value !== 'PRODUCTION'\">\n" +
    "                                    API status: <strong>{{ subApi.operation.apiStatus.value }}</strong>\n" +
    "                                    <span data-ng-if=\"subApi.operation.apiStatus.value === 'DEPRECATED'\">\n" +
    "                                        (will be deleted {{ subApi.operation.apiStatus.deletionDate | date:'medium' }})\n" +
    "                                    </span>\n" +
    "                                </p>\n" +
    "\n" +
    "                                <!-- request form -->\n" +
    "                                <form class=\"bottom-space-m10\" data-ng-submit=\"requestApi(subApi)\">\n" +
    "\n" +
    "                                    <h5 class=\"fs16 top-space-m26\" data-ng-if=\"subApi.operation.parameters.length\">Parameter(s):</h5>\n" +
    "\n" +
    "                                    <table class=\"table table-striped table-condensed\" data-ng-if=\"subApi.operation.parameters.length\">\n" +
    "                                        <thead>\n" +
    "                                            <tr>\n" +
    "                                                <th>Parameter</th>\n" +
    "                                                <th>Value</th>\n" +
    "                                                <th>&nbsp;</th>\n" +
    "                                                <th>Data Type</th>\n" +
    "                                            </tr>\n" +
    "                                        </thead>\n" +
    "                                        <tbody>\n" +
    "                                            <tr data-ng-repeat=\"param in subApi.operation.parameters\">\n" +
    "                                                <!-- param name -->\n" +
    "                                                <td>\n" +
    "                                                    <label for=\"{{param.name}}\" class=\"normal pointer\">{{ param.name }}</label>\n" +
    "                                                    <sup data-ng-if=\"param.required\" class=\"text-danger\">*</sup>\n" +
    "                                                </td>\n" +
    "\n" +
    "                                                <!-- complex type -->\n" +
    "                                                <td data-ng-if=\"param.isModel && !param.isEnum\" colspan=\"2\">\n" +
    "                                                    <div data-ng-include=\"'api/api.complexType.tpl.html'\"></div>\n" +
    "                                                </td>\n" +
    "\n" +
    "                                                <!-- classic or enum -->\n" +
    "                                                <td data-ng-if=\"!param.isModel || (param.isModel && param.isEnum)\">\n" +
    "                                                    <div data-ng-include=\"'api/api.simpleType.tpl.html'\"></div>\n" +
    "                                                </td>\n" +
    "\n" +
    "                                                <!-- description -->\n" +
    "                                                <td data-ng-if=\"!param.isModel || (param.isModel && param.isEnum)\" class=\"text-muted\">\n" +
    "                                                    {{ param.description || '&nbsp;' }}\n" +
    "                                                </td>\n" +
    "\n" +
    "                                                <!-- type -->\n" +
    "                                                <td>\n" +
    "                                                    {{ param.dataType }}\n" +
    "                                                </td>\n" +
    "                                            </tr>\n" +
    "                                        </tbody>\n" +
    "                                    </table>\n" +
    "\n" +
    "                                    <button type=\"submit\" class=\"btn btn-primary\" data-ng-disabled=\"(!isLogged && !subApi.operation.noAuthentication) || subApi.loading\">Execute</button>\n" +
    "                                    <button type=\"reset\" class=\"btn btn-default\" data-ng-disabled=\"subApi.loading\">Reset</button>\n" +
    "                                    <span class=\"loading left-space-m20\" data-ng-if=\"subApi.loading\"></span>\n" +
    "                                </form>\n" +
    "\n" +
    "                                <!-- tabs -->\n" +
    "                                <tabset class=\"top-space-m26\">\n" +
    "\n" +
    "                                    <!-- Response Class tab -->\n" +
    "                                    <tab heading=\"Response Class\">\n" +
    "                                        <pre data-ng-if=\"!subApi.operation.responseTypeIsModel\">{{ subApi.operation.responseType}}</pre>\n" +
    "                                        <div class=\"space-p10\" data-ng-if=\"subApi.operation.responseTypeIsModel\" data-jsonview=\"api.subApis.models[subApi.operation.responseType]\"></div>\n" +
    "                                    </tab>\n" +
    "\n" +
    "                                    <!-- Result tab -->\n" +
    "                                    <tab heading=\"Result\" data-active=\"subApi.result.showResult\" data-ng-if=\"subApi.result\">\n" +
    "                                        <div class=\"space-p10\" data-ng-class=\"{'bg-danger': !subApi.result.success}\" style=\"position: relative;\"\n" +
    "                                             data-ng-if=\"subApi.result && subApi.result.data\">\n" +
    "\n" +
    "                                            <!-- in success -->\n" +
    "                                            <div data-ng-if=\"subApi.result.success\">\n" +
    "                                                <div data-jsonview=\"subApi.result.data\"></div>\n" +
    "                                            </div>\n" +
    "\n" +
    "                                            <!-- in error -->\n" +
    "                                            <div data-ng-if=\"!subApi.result.success\">\n" +
    "                                                <strong class=\"text-danger\">{{subApi.result.statusText}} ({{subApi.result.status}})</strong>\n" +
    "                                                <div data-jsonview=\"subApi.result.data\"></div>\n" +
    "                                            </div>\n" +
    "\n" +
    "                                            <span class=\"label label-default label-requestTime\">{{subApi.result.requestTime || '?'}} ms</span>\n" +
    "                                        </div>\n" +
    "\n" +
    "                                    </tab>\n" +
    "\n" +
    "                                    <!-- RAW tab -->\n" +
    "                                    <tab heading=\"RAW\" data-ng-if=\"subApi.result\">\n" +
    "                                        <div class=\"raw-infos table-responsive\">\n" +
    "                                            <table class=\"table no-space\">\n" +
    "                                                <thead>\n" +
    "                                                    <tr>\n" +
    "                                                        <th style=\"width: 50%;\">Request</th>\n" +
    "                                                        <th style=\"width: 50%;\">Response</th>\n" +
    "                                                    </tr>\n" +
    "                                                </thead>\n" +
    "                                                <tbody>\n" +
    "                                                    <tr>\n" +
    "                                                        <td>\n" +
    "                                                            <strong>{{subApi.result.request.method}} {{subApi.result.request.url}}</strong>\n" +
    "                                                            <ul class=\"list-unstyled\">\n" +
    "                                                                <li data-ng-repeat=\"(headerName, headerVal) in subApi.result.request.headers\">\n" +
    "                                                                    <strong>{{headerName}}:</strong>\n" +
    "                                                                    <span>{{headerVal}}</span>\n" +
    "                                                                </li>\n" +
    "                                                            </ul>\n" +
    "                                                        </td>\n" +
    "                                                        <td>\n" +
    "                                                            <strong data-ng-class=\"{'text-success': subApi.result.status < 300, 'text-danger': subApi.result.status >= 300}\">{{subApi.result.status}} {{subApi.result.statusText}}</strong>\n" +
    "                                                            <ul class=\"list-unstyled\">\n" +
    "                                                                <li data-ng-repeat=\"(headerName, headerVal) in subApi.result.headers\">\n" +
    "                                                                    <strong>{{headerName}}:</strong>\n" +
    "                                                                    <span>{{headerVal}}</span>\n" +
    "                                                                </li>\n" +
    "                                                            </ul>\n" +
    "                                                            <pre>{{subApi.result.data}}</pre>\n" +
    "                                                        </td>\n" +
    "                                                    </tr>\n" +
    "                                                </tbody>\n" +
    "                                            </table>\n" +
    "                                        </div>\n" +
    "                                    </tab>\n" +
    "                                </tabset>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
