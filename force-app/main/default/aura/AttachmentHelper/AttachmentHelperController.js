({
    init: function(c, e, h) {
        var targets = $A.get('$Label.c.TargetSObjects');
        if (!targets){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'ERROR!!',
                message: '検索対象オブジェクトが指定されていません',
                messageTemplate: '',
                duration:' 5000',
                key: 'info_alt',
                type: 'error',
                mode: 'pester'
            });
        } else {
            var objs = targets.split(',');
            c.set('v.targetSObjects', objs);
            h.initHelper(c, objs);
        }
    },

    handleFileEvent: function(c, e, h) {
        var filebyevt = e.getParam('files');
        c.set('v.files',filebyevt);
    },

    handleComponentEvent: function(c, e, h) {
        var recbyevt = e.getParam('rec');
        var iconName = e.getParam('iconName');
        c.set('v.record',recbyevt);
        c.set('v.iconName', iconName);
    },

    handleRemove: function(c, e, h) {
        e.preventDefault();
        var targetName = e.getSource().get('v.name');
        var fs = c.get('v.files');
        fs.some(function(f, i) {
            if (targetName === f.name) fs.splice(i,1);
        });
        c.set('v.files',fs);
    },

    handleClick: function(c, e, h){
        c.set('v.isOpen', true);
        c.set('v.per', 10);
        var files = c.get('v.files');

        for (var i = 0, f; f = files[i]; i++) {
            var fr = new FileReader();
        
            fr.onload = (function(theFile) {
                return function(e) {
                    var fileContents = e.target.result;
                    var base64Mark = 'base64,';
                    var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
                    fileContents = fileContents.substring(dataStart);
                    h.upload(c, theFile, fileContents);
                }
            })(f);

            fr.readAsDataURL(f);        
        }
    }
})
