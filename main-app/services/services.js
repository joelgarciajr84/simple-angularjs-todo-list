/**
 * Service that make all hard work.
 * Persist and retrieve data from localstorage
*/
app.factory('TODO_MAIN_STORAGE', function () {

	let TD_STORAGE_ID = 'ToDoList'; // To identify in the browser

	return {

		//Retrieves a item from local storage
		get: function () {
			return JSON.parse( localStorage.getItem( TD_STORAGE_ID ) || '[]' );
		},

		//Set a new item at local storage
		put: function ( tasks ) {
			localStorage.setItem( TD_STORAGE_ID, JSON.stringify( tasks ) );
		}

	};
});
