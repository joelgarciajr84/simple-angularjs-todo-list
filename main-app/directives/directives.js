//Focus people! Set the dash and focus to the right place --
app.directive('todoFocus', function ($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});


//This is for intercept the enter key and set the current task
app.directive('whenEnterGo', function () {
	var ESCAPE_KEY = 27;
	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.whenEnterGo);
			}
		});
	};
});
