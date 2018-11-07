({
    handleFileEvent: function(c, e, h) {
        var filebyevt = e.getParam('files');
        c.set('v.files',filebyevt);
    },

    handleComponentEvent: function(c, e, h) {
        var recbyevt = e.getParam('rec');
        c.set('v.record',recbyevt);
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
