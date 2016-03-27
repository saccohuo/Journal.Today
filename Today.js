function formatInt(val) {
	if (val < 10)
		return "0" + val;
	else
		return "" + val;
}

function OnTodayBtnClicked() {
	var now = new Date();
	var location = "/My Journals/" + now.getFullYear() + "-" + formatInt(now.getMonth() + 1) + "/";
	//我个人偏向于2013-01-02这样的日期形式，如果喜欢Wiz默认的标题风格可将下一行改为
	//title = now.toLocaleDateString();
	var title = now.getFullYear() + "年" + formatInt(now.getMonth() + 1) + "月" + formatInt(now.getDate()) + "日";

	var docQuery = objDatabase.DocumentsFromSQL("DOCUMENT_LOCATION='" + location + "' AND DOCUMENT_TITLE='" + title + "'");

	var doc = null;
	if (docQuery.Count > 0) {
		doc = docQuery.Item(0);
	} else {
		var folder = objDatabase.GetFolderByLocation(location, true);
		doc = folder.CreateDocument2(title, "");
		doc.Type = "journal";
		doc.UpdateDocument3("", 0);
	}

	objWindow.ViewDocument(doc, true);
}

var pluginPath = objApp.GetPluginPathByScriptFileName("Today.js");
var languangeFileName = pluginPath + "plugin.ini";
var todayStr = objApp.LoadStringFromFile(languangeFileName, "today");
objWindow.AddToolButton("main", "todayButton", todayStr, "", "OnTodayBtnClicked");