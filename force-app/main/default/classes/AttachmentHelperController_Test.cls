@isTest
private with sharing class AttachmentHelperController_Test {

    @isTest
    private static void test_1() {
        Test.startTest();
        AttachmentHelperController.getIconName(new List<String>{'Account','Opportunity'});
        Test.stopTest();
    }

    @isTest
    private static void test_2() {
        Account a = new Account(name='test');
        insert a;

        Opportunity o = new Opportunity(name='test',
                                        Amount=10000,
                                        StageName='Value Proposition',
                                        closedate=date.today());
        insert o;

        Test.startTest();
        AttachmentHelperController.search('test',new List<String>{'Account','Opportunity'});
        Test.stopTest();
    }

    @isTest
    private static void test_3() {
        Account a = new Account(name='test');
        insert a;

        Test.startTest();
        AttachmentHelperController.saveTheFile(a.Id, 'test', 'thanks', 'txt');
        Test.stopTest();
    }
}
