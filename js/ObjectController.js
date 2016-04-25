(function(){

	angular
		.module('objects')
		.controller('ObjectController', [
			'$mdSidenav', '$mdBottomSheet',
			ObjectController
		]);

	/**
	* 
	* @param $scope
	* @param $mdSidenav
	* @param 
	* @constructor
	*/
	function ObjectController( $mdSidenav, $mdBottomSheet) {
		// $mdBottomSheet.show({
		// 	// controllerAs  : "vm",
		// 	templateUrl   : 'templates/controls.html',
		// 	// controller    : [ '$mdBottomSheet', ContactSheetController],
		// 	parent        : angular.element(document.getElementById('content'))
		// })
	}
})();


