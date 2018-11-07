({
    onfocus : function(component,event,helper){
      $A.util.addClass(component.find("mySpinner"), "slds-show");
      $A.util.removeClass(component.find("mySpinner"), "slds-hide");
      var forOpen = component.find("searchRes");
      $A.util.addClass(forOpen, 'slds-is-open');
      $A.util.removeClass(forOpen, 'slds-is-close');
      var getInputkeyWord = '';
      helper.searchHelper(component,event,getInputkeyWord);
    },

    onblur : function(component,event,helper){
      component.set("v.listOfSearchRecords", null );
      var forclose = component.find("searchRes");
      $A.util.addClass(forclose, 'slds-is-close');
      $A.util.removeClass(forclose, 'slds-is-open');
    },

    keyPressController : function(component, event, helper) {
      var getInputkeyWord = component.get("v.SearchKeyWord");
      if( getInputkeyWord.length > 0 ){
        var forOpen = component.find("searchRes");
        $A.util.addClass(forOpen, 'slds-is-open');
        $A.util.removeClass(forOpen, 'slds-is-close');
        helper.searchHelper(component,event,getInputkeyWord);
      }
      else{
        component.set("v.listOfSearchRecords", null );
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
      }
    },

    clear :function(component,event,heplper){
      var pillTarget = component.find("lookup-pill");
      var lookUpTarget = component.find("lookupField");
  
      $A.util.addClass(pillTarget, 'slds-hide');
      $A.util.removeClass(pillTarget, 'slds-show');
  
      $A.util.addClass(lookUpTarget, 'slds-show');
      $A.util.removeClass(lookUpTarget, 'slds-hide');
  
      component.set("v.SearchKeyWord",null);
      component.set("v.listOfSearchRecords", null );
      component.set("v.selectedOpp", {} );
    },

    handleComponentEvent : function(component, event, helper) {

      var selectedOppGetFromEvent = event.getParam("rec");
      component.set("v.selectedRecord" , selectedOppGetFromEvent);
  
      var forclose = component.find("lookup-pill");
      $A.util.addClass(forclose, 'slds-show');
      $A.util.removeClass(forclose, 'slds-hide');
  
      var forclose = component.find("searchRes");
      $A.util.addClass(forclose, 'slds-is-close');
      $A.util.removeClass(forclose, 'slds-is-open');
  
      var lookUpTarget = component.find("lookupField");
      $A.util.addClass(lookUpTarget, 'slds-hide');
      $A.util.removeClass(lookUpTarget, 'slds-show');
  
    },

    handleChangeSelectedRecord : function(component, event, helper) {
      var getSelectedOpp = component.get("v.selectedOpp");
          var compEvt = component.getEvent("myChangeOppEvent");
          compEvt.setParams({"oppByEvent" : getSelectedOpp});
          compEvt.fire();
    }
  })