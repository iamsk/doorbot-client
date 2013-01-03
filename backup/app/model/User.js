Ext.define('User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'email',    type: 'string' },
            { name: 'password', type: 'string' }
        ],
        validations: [
            {
                type: 'format',
                name: 'email',
                matcher: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                message: 'must be a valid email'
            },
            {
                type: 'presence',
                name: 'password'
            }
        ],
        proxy: {
            type: 'localstorage',
            id: 'users'
        }
    }
});
