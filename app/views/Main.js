App.views.Main = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var settingsButton, titlebar;

        settingsButton = {
            itemId: 'settingsButton',
            iconCls: 'settings',
            iconMask: true,
            ui: 'plain',
            handler: this.onSettingsAction,
            scope: this
        };

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Welcome to Zhihu!',
            items: [ { xtype: 'spacer' }, settingsButton ]
        };

        Ext.apply(this, {
            html: 'placeholder',
            layout: 'fit',
            dockedItems: [titlebar],
            items: [
                {
                    xtype: 'button',
                    text: 'OPEN',
                    ui: 'confirm',
                    handler: this.onOpenAction,
                    scope: this
                }
            ]
        });

        App.views.Main.superclass.initComponent.call(this);
    },

    onSettingsAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'Form'
        });
    },

    onOpenAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'Open'
        });
    }
});

Ext.reg('App.views.Main', App.views.Main);
