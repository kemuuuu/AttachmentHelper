public with sharing class AttachmentHelperController {

	@AuraEnabled
	public static String getIconName(List<String> objs){
			String u;
			List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();
			List<Schema.DescribeTabResult> tabDesc = new List<Schema.DescribeTabResult>();
			List<Schema.DescribeIconResult> iconDesc = new List<Schema.DescribeIconResult>();
			Map<String, String> result = new Map<String, String>();

			for(Schema.DescribeTabSetResult tsr : tabSetDesc) { 
				tabDesc.addAll(tsr.getTabs()); 
			}

			for (String sObjectName : objs) {
				for(Schema.DescribeTabResult tr : tabDesc) {
						if( sObjectName == tr.getSobjectName() ) {
								if( tr.isCustom() == true ) {
										iconDesc.addAll(tr.getIcons());
								} else {
										u = 'standard:' + sObjectName.toLowerCase();
								}
						}
				}
				
				for (Schema.DescribeIconResult ir : iconDesc) {
						if (ir.getContentType() == 'image/svg+xml'){
								u = 'custom:' + ir.getUrl().substringBetween('custom/','.svg').substringBefore('_');
								break;
						}
				}
				result.put(sObjectName, u);				
			}

			JSONGenerator gen = JSON.createGenerator(false);
			gen.writeStartObject();
			for (String key : result.keySet()) {
				gen.writeStringField(key, result.get(key));
			}
			gen.writeEndObject();

			return gen.getAsString();
	}

  @AuraEnabled
	public static String search(String keyword, List<String> objs) {

		if (keyword.length() < 2) {
			return null;
		}

		String q = 'FIND :keyword IN ALL FIELDS RETURNING ';
		Integer l = objs.size()-1;
		for (String obj : objs) {
			q += obj;
			if (obj == objs[l]) {
				q += '(Name)';
			} else {
				q += '(Name),';
			}
		}
		List<List<SObject>> soslResult = Search.query(q);

		// ラッパークラスに代入→オブジェクト名を持ったクラスのリスト化
		List<SObjWrapper> ws = new List<SObjWrapper>();
		for (Integer i = 0; i < objs.size(); i++) {
			for (SObject s : soslResult[i]) {
				ws.add(new SObjWrapper(objs[i], String.valueOf(s.get('Name')), String.valueOf(s.get('Id'))));
			}
		}

		JSONGenerator gen = JSON.createGenerator(false);
		gen.writeStartArray();
		for (SObjWrapper w : ws) {
			gen.writeObject(w);
		}
		gen.writeEndArray();

		return gen.getAsString();
	}

	@AuraEnabled
	public static string saveTheFile(Id parentId, String filename, String base64Data, String filetype){
		base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

		Attachment a = new Attachment();
		a.parentId = parentId;
		a.Body = EncodingUtil.base64Decode(base64Data);
		a.Name = filename;
		a.contentType = filetype;

		insert a;

		return a.Id;
	}

	class sobjWrapper {
		String objName;
		String name;
		String id;

		public SObjWrapper(String o, String n, Id i) {
			this.objName = o;
			this.name = n;
			this.id = String.valueOf(i);
		}
	}

}
