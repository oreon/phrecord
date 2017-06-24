//import { Template } from 'meteor/templating';
//
//import './accounts-templates.html';
//import { AccountsTemplates } from 'meteor/useraccounts:core';
//
//// We identified the templates that need to be overridden by looking at the available templates
//// here: https://github.com/meteor-useraccounts/unstyled/tree/master/lib
//Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
//Template['override-atPwdForm'].replaces('atPwdForm');
//Template['override-atTextInput'].replaces('atTextInput');
//Template['override-atTitle'].replaces('atTitle');
//Template['override-atError'].replaces('atError');


AccountsTemplates.addFields([
    {
        _id: 'patientId',
        type: 'text',
        displayName: 'Patient Id',
        required: true,
        //re: /(?=.*[a-z])(?=.*[A-Z])/,
        //errStr: '1 lowercase and 1 uppercase letter reqiured'
    }
])