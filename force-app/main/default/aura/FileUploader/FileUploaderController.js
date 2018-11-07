({
    handleFileChanged : function(c, e, h) {
        var evtFiles = e.getSource().get("v.files");
        var files = c.get('v.uploadingFiles');
        for (var i = 0; i < evtFiles.length; i++) {
            files.push(evtFiles[i]);
        }
        c.set("v.uploadingFiles",files);

        var compEvt = c.getEvent("uploadedFileEvent");
		compEvt.setParams({"files" : c.get('v.uploadingFiles')});
        compEvt.fire();
    }
})
