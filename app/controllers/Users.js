Ext.regController('Users', {
    store: App.stores.users,

    index: function() {
        App.views.viewport.reveal('main');
    },

    Form: function(options) {
        var model = this.store.getAt(0);
        if (model == null) {
            model = new App.models.User()
        }
        App.views.usersForm.load(model);
        App.views.viewport.reveal('usersForm');
    },

    save: function(params) {
        params.record.set(params.data);
        var errors = params.record.validate();

        if (errors.isValid()) {
            this.store.create(params.data);
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

    update: function(params) {
        var tmpUser = new App.models.User(params.data),
            errors = tmpUser.validate()
        params.data.id = 1;
        if (errors.isValid()) {
            params.record.set(params.data);
            params.record.save();
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

    Open: function(options) {
        var model = this.store.getAt(0);
        var d = new Date();
        if (model != null) {
            Ext.Ajax.request({
                url: '/door',
                method: "POST",
                params: {
                    email: model.data.email,
                    password: model.data.password,
                    timestamp: d.getTime()
                },
                success: function(resp){
                    alert(resp.responseText);
                },
                failure: function(resp){
                    alert(resp.responseText);
                }
            });
        } else {
            alert("please fill the settings!")
        }
    }
});
