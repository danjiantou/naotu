/*
 * @Author: zhaowenb
 * @Date: 2022-07-27 12:01:07
 * @LastEditTime: 2022-08-01 19:01:11
 * @LastEditors: zhaowenb
 * @Description: 
 */
angular.module('kityminderEditor', [
    'ui.bootstrap',
	'ui.codemirror',
	'ui.colorpicker'
])
	.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
		]);
	});