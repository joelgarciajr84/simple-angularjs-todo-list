app.controller('ToDoMainCtrl', function TodoCtrl($scope, $location, $filter, TODO_MAIN_STORAGE, Notification) {
	let tasks = $scope.tasks = TODO_MAIN_STORAGE.get(); // Get all current tasks when app is loaded and set them to scope.

	//Scope initializing
	$scope.newTask = '';
	$scope.editedTask = null;
	$scope.remaining = $filter('filter')(tasks, {completed: false}).length;

	//Just some location handle (Angular style)
	if ( $location.path() === '' ) {
		$location.path('/');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function (path) {
		$scope.statusFilter = {
			'/active': {
				completed: false
			},
			 '/completed': {
				 completed: true
			 }
		 }[path];
	});

	//Eyes on remaing tasks
	$scope.$watch('remaining == 0', function (val) {
		$scope.allChecked = val;
	});

	//Functio that add the new task to localstorare
	$scope.addNewTask = function () {
		var newTask = $scope.newTask.trim();
		if ( newTask.length === 0 ) {
			return;
		}

		tasks.push({
			title: newTask,
			completed: false
		});

		TODO_MAIN_STORAGE.put( tasks ); //Sending to factory

		$scope.newTask = '';
		$scope.remaining++; // Increase remaining
		Notification.success({message:  newTask + ' added successfully!', title: 'Todo List'});


	};

	//Simple function to edit task using clone
	$scope.editTask = function (task) {
		$scope.editedTask = task;
		$scope.originalTask = angular.extend({}, task);
		Notification.success({message:  task + ' successfully edited!', title: 'Todo List'});
	};

	//Rollback  editing
	$scope.revertEditing = function (todo) {
		tasks[tasks.indexOf(todo)] = $scope.originalTask;
		$scope.finishEditing($scope.originalTask);
	};

	//Remove task from localstorage
	$scope.removeTask = function (task) {
		$scope.remaining -= task.completed ? 0 : 1;
		tasks.splice(tasks.indexOf(task), 1);
		TODO_MAIN_STORAGE.put(tasks);

		Notification.success({message:  task.title + ' successfully removed!', title: 'Todo List'});
	};

	//When user finish editing some task
	$scope.finishEditing = function (task) {
		$scope.editedTask = null;
		task.title = task.title.trim();
		if (!task.title) {
			$scope.removeTask( task );
		}
		TODO_MAIN_STORAGE.put( tasks );
		Notification.success({message:  task.title + ' successfully edited!', title: 'Todo List'});
	};

	//When task is completed
	$scope.taskCompleted = function (task) {
		$scope.remaining += task.completed ? -1 : 1;
		TODO_MAIN_STORAGE.put(tasks);
		Notification.success({message:  task.title + ' is completed!', title: 'Todo List'});
	};

	//Clear all ( Now you can go do something really cool! )
	$scope.clearAllFinishedTasks = function () {
		$scope.tasks = tasks = tasks.filter(function (val) {
			return !val.completed;
		});
		TODO_MAIN_STORAGE.put(tasks);
		Notification.success({message: 'All clean!', title: 'Todo List'});
	};

});
