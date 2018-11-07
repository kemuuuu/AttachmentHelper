({
	selectRecord : function(component, event, helper) {
		var getSelectedOpp = component.get("v.rec");
		var compEvt = component.getEvent("selectedRecordEvent");
		compEvt.setParams({"rec" : getSelectedOpp});
		compEvt.fire();
	}
})