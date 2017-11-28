let app = angular.module('toDoListApp', ['ui-notification']); //Module declaration

app.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 4000,
        startTop: 40,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'top',
        positionY: 'top'
    });
});
