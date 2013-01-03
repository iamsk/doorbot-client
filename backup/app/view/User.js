Ext.define('doorbot.view.User', {
    extend: 'Ext.tab.Panel',
    xtype : 'user',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.field.Email'
    ],
    config: {
        title: 'Setting',
        iconCls: 'settings',
        xtype: 'formpanel',
        url: 'contact.php',
        layout: 'vbox',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Setting'
            },
            {
                xtype: 'fieldset',
                title: 'Setting',
                instructions: '(Please fill the information above.)',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '20%'
                },
                items: [
                    {
                        xtype: 'emailfield',
                        name : 'email',
                        label: 'Email',
                        clearIcon: true
                    },
                    {
                        xtype: 'passwordfield',
                        name : 'password',
                        label: 'Password',
                        clearIcon: true
                    },
                ]
            },
            {
                xtype: 'button',
                text: 'Save',
                ui: 'confirm',
                scope: this,
                handler: function() {
                    var form = this.form;

                    // Mask the form
                    form.setMasked({
                        xtype: 'loadmask',
                        message: 'Saving...'
                    });

                    // Put it inside a timeout so it feels like it is going to a server.
                    setTimeout(function() {
                        if (form.user) {
                            // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                            // with the latest values.
                            form.updateRecord(form.user, true);
                        }

                        // Unmask the formpanel
                        form.setMasked(false);
                    }, 1000);
                }
            }
        ]
    }
});
