({
	searchHelper : function(cmp, ev, kw) {
		var myId = cmp.get("v.myOppId");
		var action = cmp.get("c.search");
		var objs = cmp.get('v.SearchTargets');

		action.setParams({
			"keyword": kw,
			"objs": objs
		});

		action.setCallback(this, function(res){
			$A.util.removeClass(cmp.find("mySpinner"),"slds-show");
			var state = res.getState();
			var resultList = [];
			
			if (state === "SUCCESS") {
				var retval = JSON.parse(res.getReturnValue());
				if (retval) {
					retval.forEach(function(r){
						resultList.push(r);
					});
				}
				cmp.set('v.listOfSearchRecords',resultList);
				$A.util.addClass(cmp.find("mySpinner"), "slds-hide");
		    $A.util.removeClass(cmp.find("mySpinner"), "slds-show");
			}
			else if (state === "ERROR") {
				alert('error');
			}
		});
		$A.enqueueAction(action);
	}
})