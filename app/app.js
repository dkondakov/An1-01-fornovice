(function() {
	'use strict';

	angular.module('app', ["ngSanitize"])
		.controller('Todo', Todo)
		.directive('taskList', taskList)
		.factory("todoService", todoService)
		.filter("checkedItems", checkedItems)
		.run(runApp)
		.value('model', {
			'user': 'Vitaliy',
			'userPhoto': 'images/VZ.jpg'//,
			// 'items': [
			// 	{ 'action': 'Estimate...', 'done': false },
			// 	{ 'action': 'Create...', 'done': false },
			// 	{ 'action': 'Edit...', 'done': true },
			// 	{ 'action': 'Delete...', 'done': false }
			// ]
		});

	angular.element(document).ready(() => {
		angular.bootstrap(document, ['app']);
	});

	function runApp($http, model) {
		$http
			.get("todo.json")
			.then(response => model.items = response.data);
	}

	function Todo(model, todoService) {
		let $ctrl = this;
		$ctrl.todo = model;
		$ctrl.html = '<span>Vitaliy</span>';
		$ctrl.showComplete = true;

		// $ctrl.incompleteCount = todoService.incompleteCount;
		// $ctrl.warningLevel = todoService.warningLevel;
		Object.assign($ctrl, todoService);

		console.log($ctrl.todo);
	}

	function taskList() {
		return {
			restrict: 'E',
			templateUrl: 'table.html'
		};
	}

	function todoService() {
		return {
			addNewItem,
			incompleteCount,
			warningLevel
		};

		function addNewItem(items, newItem) {
			if (newItem && newItem.action) {
				items.push({
					action: newItem.action,
					done: false
				});

				newItem.action = '';
			}
		}

		function incompleteCount(items) {
			let count = 0;

			angular.forEach(items, (item) => {
				if (!item.done) {
					count++;
				}
			});

			return count;
		}

		function warningLevel(items) {
			return incompleteCount(items) < 3
				? 'label-success'
				: 'label-warning';
		}
	}

	function checkedItems() {
		return function (items, showComplete) {
			let result = [];

			if (angular.isArray(items)) {
				angular.forEach(items, (item) => {
					if (!item.done || showComplete) {
						result.push(item);
					}
				});
				return result;
			}
			else {
				return items;
			}
		};
	}

})();