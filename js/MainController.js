(function(){

	angular
		.module('harmonicMotion', ['ngMaterial', 'objects'])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('red');
		});
})();
