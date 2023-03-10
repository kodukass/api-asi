

document.getElementById("app").innerHTML = `<table id = "xmlTable"></table>`;

const getXml = function(filename) {
	const xmlhttp = new XMLHttpRequest()
	xmlhttp.open("GET", filename, false)
	xmlhttp.send()
	return xmlhttp.responseXML
}

const getPlatforms = function(htmlCollection) {
	return [...htmlCollection].map(element => element.childNodes[0].nodeValue).join("/")
}

const generateTable = function(XMLContent) {
	let tableRows = "<tr><th>Title</th><th>Price</th><th>Platforms</th></tr>"
	const gameElements = XMLContent.getElementsByTagName("game")
	for (let i = 0; i < gameElements.length; i++) {
		const game = gameElements[i];
		console.log(game);
		tableRows += "<tr><td>" + 
			game.getElementsByTagName("title")[0].childNodes[0].nodeValue + "</td><td>" + 
			game.getElementsByTagName("price")[0].childNodes[0].nodeValue + "</td><td>" +
			getPlatforms(game.getElementsByTagName("platform")) + "</td></tr>"
			}
	document.getElementById("xmlTable").innerHTML = tableRows		
	}
	


generateTable(getXml("src/games.xml"))