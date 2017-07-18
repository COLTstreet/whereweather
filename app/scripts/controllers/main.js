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
		

		function getWeather() {
			//Beginning of code
			//Makes the request
			$.ajax({
				url : "https://api.darksky.net/forecast/d9073d8d9951961b9307c814cc925140/" + $scope.searchLocationInfo.latitude + "," + $scope.searchLocationInfo.longitude,
				dataType : "jsonp",
				success : function(parsed_json) {
					// var location = parsed_json['timezone'];
					// var temp_f = parsed_json['currently']['temperature'];
					// var complete = ("Current temperature in " + location + " is: " + temp_f);
					$scope.$apply(function() { // put $scope var that needs to be updated
						$scope.weatherReport = parsed_json;     // inside a function inside $apply like this
						console.log(parsed_json);
					});
				}
			});
		}

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

		function resize() {
			document.getElementById("page").style.height = $(window).height() + "px";
		}
		
		function init() {
			$scope.resize();
			// $scope.getWeather();

			$scope.gmapsService = new google.maps.places.AutocompleteService();
			$scope.map = new google.maps.Map(document.createElement('div'));
			$scope.placeService = new google.maps.places.PlacesService($scope.map);
		}

		$scope.init();

		//Window resize listener
		window.addEventListener("resize",$scope.resize,false);
	});
