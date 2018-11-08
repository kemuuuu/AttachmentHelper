({
	init: function(c, e, h) {
		var obj = c.get('v.rec.objName');
		c.set('v.iconName', c.get('v.iconNames')[obj]);
	},

	selectRecord : function(component, event, helper) {
		var getSelectedOpp = component.get("v.rec");
		var iconName = component.get("v.iconName");
		var compEvt = component.getEvent("selectedRecordEvent");
		compEvt.setParams({
			"rec" : getSelectedOpp,
			"iconName": iconName
		});
		compEvt.fire();
	}
})