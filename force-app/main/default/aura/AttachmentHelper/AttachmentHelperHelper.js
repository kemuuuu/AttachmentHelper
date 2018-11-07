({
    upload : function(component,file,fileContents){
      console.log('helper')
      component.set('v.per', 40);

      var action = component.get("c.saveTheFile");
      action.setParams({
        parentId: component.get('v.record.Id'),
        filename: file.name,
        base64Data: fileContents,
        filetype: file.type
      });

      component.set('v.per', 60);
      action.setCallback(this, function(result){
        var state = result.getState();
        var type;
        var title;
        var message;
        if (state === 'SUCCESS') {
            type = 'success';
            title = 'Success!!';
            message = file.name + ' is uploaded';
        } else if (state === 'ERROR') {
            type = 'error';
            title = 'Error!!';
            message = 'Upload failed';
        }
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : title,
            message: message,
            messageTemplate: '',
            duration:' 5000',
            key: 'info_alt',
            type: type,
            mode: 'pester'
        });
        component.set('v.per', 100);
        component.set('v.files', []);
        component.set('v.isOpen',false);
        toastEvent.fire();
      });

      $A.enqueueAction(action);
    }
  })