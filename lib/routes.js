if(Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('measurements');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('signin');
	});
}
FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('signin');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'PtGraphs'});
	}
});


FlowRouter.route('/ptHome', {
	name: 'graphs',
	action() {
		BlazeLayout.render('MainLayout', {main: 'PtGraphs'});
	}
});

FlowRouter.route('/schedule', {
	name: 'schedule',
	action() {
		BlazeLayout.render('MainLayout', {main: 'scheduledEvents'});
	}
});


FlowRouter.route('/profile', {
	name: 'profile',
	action() {
		BlazeLayout.render('MainLayout', {main: 'profile'});
	}
});


FlowRouter.route('/measurements', {
	name: 'measurements',
	action() {
		BlazeLayout.render('MainLayout', {main: 'measurements'});
	}
});