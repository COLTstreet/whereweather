'use strict';

/**
 * @ngdoc function
 * @name whereweatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whereweatherApp
 */
angular.module('whereweatherApp')
	.controller('MainCtrl', function ($scope, $q) {

		//Functions
		$scope.init = init;
		$scope.getWeather = getWeather;
		$scope.resize = resize;
		$scope.search = search;
		$scope.getLatLng = getLatLng;
		$scope.buildWeather = buildWeather;
		$scope.makeItRain = makeItRain;
		$scope.unixTime = unixTime;
		$scope.getLocation = getLocation;
		$scope.setIconBooleans = setIconBooleans;

		function search(input) {
			if (!input) {
				return;
			}
			return getResults(input).then(function(places) {
				return places;
			});
		}   

		function getResults(address) {
			var deferred = $q.defer();
			$scope.gmapsService.getQueryPredictions({
				input: address
			}, function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}

		function unixTime(t) {
			var dt = new Date(t*1000);
			
			//Weekday variable holder
			var weekday = new Array(7);
			weekday[0] =  "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";

			var dayOfWeek = weekday[dt.getDay()];

			//Month variable holder
			var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";

			var monthOfYear = month[dt.getMonth()];


			return dayOfWeek + ", " + monthOfYear + " " + dt.getDate() + " " + dt.getFullYear();
		}
		

		function getWeather(position) {
			//Beginning of code
			//Makes the request
			if(position) {
				$.ajax({
					url : "https://api.darksky.net/forecast/d9073d8d9951961b9307c814cc925140/" + position.coords.latitude + "," + position.coords.longitude,
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
							$scope.weatherReport = parsed_json;     // inside a function inside $apply like this
							console.log(parsed_json);
							$scope.buildWeather();
						});
					}
				});
			} else {
				$.ajax({
					url : "https://api.darksky.net/forecast/d9073d8d9951961b9307c814cc925140/" + $scope.searchLocationInfo.latitude + "," + $scope.searchLocationInfo.longitude,
					dataType : "jsonp",
					success : function(parsed_json) {
						$scope.$apply(function() { // put $scope var that needs to be updated
							$scope.weatherReport = parsed_json;     // inside a function inside $apply like this
							console.log(parsed_json);
							$scope.buildWeather();
						});
					}
				});
			}
		}

		function buildWeather() {
			$scope.current = $scope.weatherReport.currently;

			if(!$scope.weatherIcon) {
				$scope.weatherIcon = $scope.current.icon;
				document.getElementById("body-content").className += " " + $scope.current.icon;
			} 
			if($scope.weatherIcon !== $scope.current.icon) {
				document.getElementById("body-content").className = document.getElementById("body-content").className.replace($scope.weatherIcon, $scope.current.icon);
				$scope.weatherIcon = $scope.current.icon;
			}

			if($scope.current.icon === 'rain') {
				$scope.raining = true;
				$scope.makeItRain();
			} else {
				$scope.raining = false;
			}

			$scope.setIconBooleans();
			
			$scope.showWeather = true;
		};

		function setIconBooleans() {
			for(var i = 0; i < $scope.weatherReport.daily.data.length; i++){
				var d = $scope.weatherReport.daily.data[i];
				if(d.icon === "rain"){
					d.rain = true;
				} else if(d.icon === "clear-day"){
					d.clearDay = true;
				} else if(d.icon === "clear-night"){
					d.clearNight = true;
				} else if(d.icon === "rain"){
					d.rain = true;
				} else if(d.icon === "cloudy"){
					d.cloudy = true;
				} else if(d.icon === "partly-cloudy-day"){
					d.partlyCloudyDay = true;
				} else if(d.icon === "partly-cloudy-night"){
					d.partlyCloudyNight = true;
				} else if(d.icon === "snow"){
					d.snow = true;
				} else if(d.icon === "sleet"){
					d.sleet = true;
				}
			}
		};

		var getDetails = function(place) {
			var deferred = $q.defer();
			$scope.placeService.getDetails({
				'placeId': place.place_id
			}, function(details) {
				deferred.resolve(details);
			});
			return deferred.promise;
        };

		function getLatLng(place) {
			if (!place) {
				$scope.info = {};
				return;
			}
			getDetails(place).then(function(details) {
				$scope.searchLocationInfo = {
					'name': place.description,
					'latitude': details.geometry.location.lat(),
					'longitude': details.geometry.location.lng(),
				};
				$scope.getWeather();
			});
        }

		function makeItRain() {
			//clear out everything
			var increment = 0;
			var drops = "";
			var backDrops = "";

			while (increment < 95) {
				//couple random numbers to use for various randomizations
				//random number between 98 and 1
				var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
				//random number between 5 and 2
				var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
				//increment
				increment += randoFiver;
				//add in a new raindrop with various randomizations to certain CSS properties
				drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
				backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
			}

			$('.rain.front-row').append(drops);
			$('.rain.back-row').append(backDrops);
		}

		function resize() {
			document.getElementById("page").style.height = $(window).height() + "px";
		}

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					$scope.$apply(function(){
						$scope.browserPosition = position;
						$scope.getWeather($scope.browserPosition);
					});
				});
			}
		}
		
		function init() {
			$scope.resize();
			// $scope.getWeather();

			$scope.gmapsService = new google.maps.places.AutocompleteService();
			$scope.map = new google.maps.Map(document.createElement('div'));
			$scope.placeService = new google.maps.places.PlacesService($scope.map);

			$scope.cloudy = false;

			$scope.getLocation();
		}

		$scope.init();

		//Window resize listener
		window.addEventListener("resize",$scope.resize,false);
	});
