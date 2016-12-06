(function() {
	'use strict';

	angular.module('app', ["ngSanitize"])
		.controller('Todo', Todo)
		.value('model', {
			'user': 'Vitaliy',
			'userPhoto': 'images/VZ.jpg',
			'items': [
				{ 'action': 'Estimate...', 'done': false },
				{ 'action': 'Create...', 'done': false },
				{ 'action': 'Edit...', 'done': true },
				{ 'action': 'Delete...', 'done': false }
			]
		});

	angular.element(document).ready(() => {
		angular.bootstrap(document, ['app']);
	});

	function Todo(model) {
		let $ctrl = this;
		$ctrl.todo = model;
		$ctrl.html = '<span>Vitaliy</span>';
		console.log($ctrl.todo);
	}

})();