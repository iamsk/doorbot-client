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
        if (model != null) {
            Ext.Ajax.request({
                url: '/open',
                method: "POST",
                params: {
                    email: model.email,
                    password: model.password
                },
                success: function(){
                    alert("open sucessful");
                },
                failure: function(){
                    alert("open failed");
                }
            });
        } else {
            alert("please fill the settings!")
        }
    }
});
