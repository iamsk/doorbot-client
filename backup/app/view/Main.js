Ext.define('doorbot.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'doorbot.view.User'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'DOOR',
                iconCls: 'home',
                styleHtmlContent: true,
                scrollable: true,
                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Zhihu!'
                },
                html: "Hello world!"
            },
            //{
            //    title: 'SETTINGS',
            //    iconCls: 'settings',
            //    xtype: 'User'
            //}
        ]
    }
});
