public with sharing class AttachmentHelperController {

    @AuraEnabled
	public static List<List<SObject>> search(String keyword) {
		if (keyword.length() > 1) {
			return [FIND :keyword IN ALL FIELDS RETURNING Account(Name), Opportunity(Name,CloseDate)];
		}
		return null;
	}

	@AuraEnabled
	public static string saveTheFile(Id parentId, String filename, String base64Data, String filetype){
		System.debug('ID: ' + parentId);
		System.debug('file: ' + filename);
		System.debug('base64Data: ' + base64Data);
		base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

		Attachment a = new Attachment();
		a.parentId = parentId;
		a.Body = EncodingUtil.base64Decode(base64Data);
		a.Name = filename;
		a.contentType = filetype;

		insert a;

		return a.Id;
	}

}
