AccountsTemplates.configure({
    showForgotPasswordLink: true,
    defaultTemplate: 'Auth_page',
    defaultLayout: 'HomeLayout',
    defaultContentRegion: 'main',
    defaultLayoutRegions: {},
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
    name: 'join',
    path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPwd',
    path: '/reset-password',
});