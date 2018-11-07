({
	searchHelper : function(cmp, ev, kw) {
		var myId = cmp.get("v.myOppId");
		var action = cmp.get("c.search");
		action.setParams({
			"keyword" : kw,
		});
		action.setCallback(this, function(res){
			$A.util.removeClass(cmp.find("mySpinner"),"slds-show");
			var state = res.getState();
			var resultList = [];
			if (state === "SUCCESS") {
				var retval = res.getReturnValue();
				retval.forEach(function(recs){
					recs.forEach(function(r){
						resultList.push(r);
					})
				});
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