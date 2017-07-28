"use strict";angular.module("whereweatherApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("light-blue").accentPalette("light-blue").warnPalette("orange").backgroundPalette("grey").dark()}]),angular.module("whereweatherApp").controller("MainCtrl",["$scope","$q",function(a,b){function c(a){return a?d(a).then(function(a){return a}):void 0}function d(c){var d=b.defer();return a.gmapsService.getQueryPredictions({input:c},function(a){d.resolve(a)}),d.promise}function e(a){var b=new Date(1e3*a),c=new Array(7);c[0]="Sunday",c[1]="Monday",c[2]="Tuesday",c[3]="Wednesday",c[4]="Thursday",c[5]="Friday",c[6]="Saturday";var d=c[b.getDay()],e=new Array;e[0]="January",e[1]="February",e[2]="March",e[3]="April",e[4]="May",e[5]="June",e[6]="July",e[7]="August",e[8]="September",e[9]="October",e[10]="November",e[11]="December";var f=e[b.getMonth()];return d+", "+f+" "+b.getDate()+" "+b.getFullYear()}function f(b){b?$.ajax({url:"https://api.darksky.net/forecast/d9073d8d9951961b9307c814cc925140/"+b.coords.latitude+","+b.coords.longitude,dataType:"jsonp",success:function(b){a.$apply(function(){a.weatherReport=b,console.log(b),a.buildWeather()})}}):$.ajax({url:"https://api.darksky.net/forecast/d9073d8d9951961b9307c814cc925140/"+a.searchLocationInfo.latitude+","+a.searchLocationInfo.longitude,dataType:"jsonp",success:function(b){a.$apply(function(){a.weatherReport=b,console.log(b),a.buildWeather()})}})}function g(){a.current=a.weatherReport.currently,a.weatherIcon||(a.weatherIcon=a.current.icon,document.getElementById("body-content").className+=" "+a.current.icon),a.weatherIcon!==a.current.icon&&(document.getElementById("body-content").className=document.getElementById("body-content").className.replace(a.weatherIcon,a.current.icon),a.weatherIcon=a.current.icon),"rain"===a.current.icon?(a.raining=!0,a.makeItRain()):a.raining=!1,a.setIconBooleans(),a.showWeather=!0}function h(){for(var b=0;b<a.weatherReport.daily.data.length;b++){var c=a.weatherReport.daily.data[b];"rain"===c.icon?c.rain=!0:"clear-day"===c.icon?c.clearDay=!0:"clear-night"===c.icon?c.clearNight=!0:"rain"===c.icon?c.rain=!0:"cloudy"===c.icon?c.cloudy=!0:"partly-cloudy-day"===c.icon?c.partlyCloudyDay=!0:"partly-cloudy-night"===c.icon?c.partlyCloudyNight=!0:"snow"===c.icon?c.snow=!0:"sleet"===c.icon&&(c.sleet=!0)}}function i(b){return b?void n(b).then(function(c){a.searchLocationInfo={name:b.description,latitude:c.geometry.location.lat(),longitude:c.geometry.location.lng()},a.getWeather()}):void(a.info={})}function j(){for(var a=0,b="",c="";95>a;){var d=Math.floor(98*Math.random()+1),e=Math.floor(4*Math.random()+2);a+=e,b+='<div class="drop" style="left: '+a+"%; bottom: "+(e+e-1+100)+"%; animation-delay: 0."+d+"s; animation-duration: 0.5"+d+'s;"><div class="stem" style="animation-delay: 0.'+d+"s; animation-duration: 0.5"+d+'s;"></div><div class="splat" style="animation-delay: 0.'+d+"s; animation-duration: 0.5"+d+'s;"></div></div>',c+='<div class="drop" style="right: '+a+"%; bottom: "+(e+e-1+100)+"%; animation-delay: 0."+d+"s; animation-duration: 0.5"+d+'s;"><div class="stem" style="animation-delay: 0.'+d+"s; animation-duration: 0.5"+d+'s;"></div><div class="splat" style="animation-delay: 0.'+d+"s; animation-duration: 0.5"+d+'s;"></div></div>'}$(".rain.front-row").append(b),$(".rain.back-row").append(c)}function k(){document.getElementById("page").style.height=$(window).height()+"px"}function l(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(b){a.$apply(function(){a.browserPosition=b,a.getWeather(a.browserPosition)})})}function m(){a.resize(),a.gmapsService=new google.maps.places.AutocompleteService,a.map=new google.maps.Map(document.createElement("div")),a.placeService=new google.maps.places.PlacesService(a.map),a.cloudy=!1,a.getLocation()}a.init=m,a.getWeather=f,a.resize=k,a.search=c,a.getLatLng=i,a.buildWeather=g,a.makeItRain=j,a.unixTime=e,a.getLocation=l,a.setIconBooleans=h;var n=function(c){var d=b.defer();return a.placeService.getDetails({placeId:c.place_id},function(a){d.resolve(a)}),d.promise};a.init(),window.addEventListener("resize",a.resize,!1)}]),angular.module("whereweatherApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("whereweatherApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div id="page" layout="column" layout-align="stretch"> <div class="header-container" layout="column" layout-align="stretch" flex="10"> <div id="header-body" layout="row" layout-align="stretch"> <div id="logo-container" flex="25"> <picture> <source media="(min-width: 200px)" sizes="80vw" srcset="images/whereweather-logo.03616be7.png"> <img class="whereweather-logo-sm" style="width: 100%; height: 100%" src="" alt="" sizes="80vw" srcset=""> </source></picture> </div> <div id="header-search" layout="column" layout-aliogn="center center" flex="50"> <div id="place-autocomplete"> <md-autocomplete md-no-cache="false" md-input-name="autocompleteField" md-selected-item="selectedItem" md-selected-item-change="getLatLng(item)" ng-model-options="{debounce: 600}" md-search-text-change="search(searchText)" md-search-text="searchText" md-items="item in search(searchText)" md-item-text="item.description" md-min-length="2" md-max-length="50" md-floating-label="Location (area and city)" placeholder="Type your address"> <md-item-template> <span md-highlight-text="searchText" md-highlight-flags="^i">{{item.description}}</span> </md-item-template> <md-not-found> No matches found for "{{searchText.description}}". </md-not-found> </md-autocomplete> </div> </div> <div id="header-tools" flex="25"> </div> </div> </div> <div class="body-container" flex="75" style="background: #E0E0E0"> <div ng-show="raining" class="rain front-row"></div> <div id="body-content" class="body-content" flex="100" layout="column" layout-align="stretch" ng-show="showWeather"> <div layout="column" layout-align="center center" flex="60"> <div layout="column" layout-align="center center" class="temp-section" flex="100"> <div flex="5" style="font-size: 2.5vh; color: #303030"> {{unixTime(weatherReport.currently.time)}} </div> <div flex="90" style="color: #303030" layout="column" layout-align="start center"> <div> {{weatherReport.currently.temperature}}° </div> <div flex="100" layout="column" layout-align="start start" class="temp-section-subtext"> <div> Humidity: {{(100*weatherReport.currently.humidity).toFixed(0)}}% </div> <div> Chance of Rain: {{(100*weatherReport.currently.precipProbability).toFixed(0)}}% </div> <div> Summary: {{weatherReport.currently.summary}} </div> </div> </div> </div> </div> <div layout="row" layout-align="center end" flex="40"> <div flex ng-repeat="day in weatherReport.daily.data track by $index" class="full-height day" layout="column" layout-align="start center" ng-show="$index != 0"> <div class="day-header"> {{unixTime(day.time)}} </div> <div class="day-body" flex="70" layout="column" layout-align="center center"> <div ng-if="day.clearDay"> <md-icon class="day-icon" md-svg-src="images/clear-day.74461a4a.svg"></md-icon> </div> <div ng-if="day.clearNight"> <md-icon class="day-icon" md-svg-src="images/clear-night.9496d605.svg"></md-icon> </div> <div ng-if="day.rain"> <md-icon class="day-icon" md-svg-src="images/rain.22799b45.svg"></md-icon> </div> <div ng-if="day.cloudy"> <md-icon class="day-icon" md-svg-src="images/cloudy.635cc19a.svg"></md-icon> </div> <div ng-if="day.partlyCloudyDay"> <md-icon class="day-icon" md-svg-src="images/partly-cloudy-day.fbd4cafc.svg"></md-icon> </div> <div ng-if="day.partlyCloudyNight"> <md-icon class="day-icon" md-svg-src="images/partly-cloudy-night.0f40e6ba.svg"></md-icon> </div> <div ng-if="day.snow"> <md-icon class="day-icon" md-svg-src="images/snow.251a1328.svg"></md-icon> </div> <div ng-if="day.sleet"> <md-icon class="day-icon" md-svg-src="images/sleet.0fd3c11f.svg"></md-icon> </div> </div> <div class="day-footer"> Humidity: {{(100*day.humidity).toFixed(0)}}%  Chance of Rain: {{(100*day.precipProbability).toFixed(0)}}% </div> </div> </div> </div> </div> <div class="footer-container" flex="15" layout="column" layout-align="center center "> <div> <a href="https://darksky.net/poweredby" target="_blank" style="color:#989898">Powered by Dark Sky</a> </div>  <div layout="row"> <div> <md-button class="md-fab md-mini md-primary" ng-href="https://www.linkedin.com/in/colt-street-b1b34946" target="_blank" aria-label="LinkedIn"> <i class="fa fa-linkedin-square fa-lg" aria-hidden="true" aria-label="linkedin"></i> <md-tooltip>LinkedIn</md-tooltip> </md-button> </div> <div> <md-button class="md-fab md-mini md-primary" ng-href="https://github.com/COLTstreet" target="_blank" aria-label="GitHub"> <i class="fa fa-git-square fa-lg" aria-hidden="true" aria-label="GitHub"></i> <md-tooltip>GitHub</md-tooltip> </md-button> </div> <div> <md-button class="md-fab md-mini md-primary" ng-href="mailto:colt.k.street@gmail.com?Subject=Hello!" target="_blank" aria-label="Gmail"> <i class="fa fa-envelope" aria-hidden="true" aria-label="Gmail"></i> <md-tooltip>Gmail</md-tooltip> </md-button> </div> <div> <md-button class="md-fab md-mini md-primary" ng-href="https://plus.google.com/u/0/116028321943063867870" target="_blank" aria-label="Google+"> <i class="fa fa-google-plus" aria-hidden="true" aria-label="Google"></i> <md-tooltip>Google+</md-tooltip> </md-button> </div> </div> </div> </div>')}]);