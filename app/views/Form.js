App.views.UsersForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, fields;

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Create',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'userFormFieldset',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '30%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
                {
                    name: 'email',
                    label: 'email',
                    xtype: 'emailfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email'
                },
                {
                    name : 'password',
                    label: 'password',
                    xtype: 'passwordfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'password'
                },
            ]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ],
            listeners: {
                beforeactivate: function() {
                    var saveButton = this.down('#userFormSaveButton'),
                        titlebar = this.down('#userFormTitlebar'),
                        model = this.getRecord();

                    if (model.phantom) {
                        titlebar.setTitle('Create');
                        saveButton.setText('create');
                    } else {
                        titlebar.setTitle('Update');
                        saveButton.setText('update');
                    }
                },
                deactivate: function() {
                    this.resetForm();
                }
            }
        });

        App.views.UsersForm.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'index'
        });
    },

    onSaveAction: function() {
        var model = this.getRecord();

        Ext.dispatch({
            controller: 'Users',
            action    : (model.phantom ? 'save' : 'update'),
            data      : this.getValues(),
            record    : this.getRecord(),
            form      : this
        });
    },

    showErrors: function(errors) {
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field) {
            var fieldErrors = errors.getByField(field.name),
                errorField = this.resetField(field);

            if (fieldErrors.length > 0) {
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    },

    resetForm: function() {
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },

    resetField: function(field) {
        var errorField = this.down('#'+field.name+'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }
});

Ext.reg('App.views.UsersForm', App.views.UsersForm);
