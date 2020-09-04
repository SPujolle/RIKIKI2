class Rikiki{



constructor(){
	this.commentChar ='/';
	this.titleChar='#';
	this.sep = " | ";
	this.title = [];
	this.url = [];
	this.toolTip = [];
	this.navLink =[] ;
	this.rikikiSite = "http://sylvain.fish.free.fr/RIKIKI/#?NAME=Rikiki_NO_CMS__Download_and_install&INDEX=1";
		this.setWindowLayout();
		this.mainMenu();
}

//=============================================//
// replace script tag in innerHTML to allow execution

nodeScriptReplace(node) {
        if ( this.nodeScriptIs(node) === true ) {
                node.parentNode.replaceChild( this.nodeScriptClone(node) , node );
        } else {
                var i = -1, children = node.childNodes;
                while ( ++i < children.length ) {
                      this.nodeScriptReplace( children[i] );
                }
        }

        return node;
}
nodeScriptClone(node){
        var script  = document.createElement("script");
        script.text = node.innerHTML;

        var i = -1, attrs = node.attributes, attr;
        while ( ++i < attrs.length ) {                                    
              script.setAttribute( (attr = attrs[i]).name, attr.value );
        }
        return script;
}

nodeScriptIs(node) {
        return node.tagName === 'SCRIPT';
}

//===============================================//

decodeHtml(html) {
	// get html entities --> return unicode
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

setWindowLayout(){
	this.main_frame = document.createElement("DIV");	
		this.main_frame.className = "main_frame";
		document.body.appendChild(this.main_frame);
	
		
	this.main_menu = document.createElement("DIV");	
		this.main_menu.className = "main_menu";
	this.main_frame.appendChild(this.main_menu);
	
	this.W = document.createElement("DIV");
	this.W.className = "box";
		this.main_frame.appendChild(this.W);

	this.centralW = document.createElement("DIV");
		this.centralW.className="cent";
	
	this.leftCol = document.createElement("DIV");	
		this.leftCol.className = "leftC";

	this.footer = document.createElement("DIV");
		this.footer.className = "footer";
		this.footer.innerHTML = '<< cheaply powered by   <A href="'+  this.rikikiSite  +'"> RIKIKI &#x1F531; </A> >>';
		
	this.bottomNaviArea = document.createElement("DIV");	
		this.bottomNaviArea.className = "bottomNaviArea";
		
		this.W.appendChild(this.leftCol);
		this.W.appendChild(this.centralW);
		
		this.main_frame.appendChild(this.footer);
}



UrlNav(i){
	var Get = '#?NAME=' +  encodeURIComponent( this.navLink[i])  ;
	return Get 
}

genLink(i){
	var A = document.createElement("A");
	A.setAttribute("title", this.toolTip[i]);
	A.href = this.UrlNav(i) ;
	//A.text = this.decodeHtml( this.title[i].replace(/^#/g,'') );
	 var re = new RegExp('^'+this.titleChar, 'g')
	 A.text = this.decodeHtml( this.title[i].replace(re,'') );

	return A ;
}

leftColCont(N,C){
			this.leftCol.innerHTML = "<br>"
		var i = N;
		if (i < this.title.length){
			do{	
			var L = this.genLink(i) ;
				this.leftCol.appendChild(  L  )  ;
				if(i == C) L.className="currentPage";	
				if (i==N) L.className="leftTitre"
				i++
			}while (i< this.title.length && this.title[i][0]==this.titleChar  )	
		}
}

fillLeftCol(N){	
	if(this.title[N][0]!=this.titleChar){ 
		this.leftColCont(N);
	}else{
		var i = N ;
		while(this.title[i][0]==this.titleChar){
			i--;
		}
		this.leftColCont(i,N);
	}
}
bottomNaviLinks(i){
		this.bottomNaviArea.innerHTML = "";
		
		if (i!=0){
			if(this.title[i][0] == this.titleChar){
				var P = document.createElement("A");	
				P.href = this.UrlNav(i-1) ; 
				P.text = "<-- precedent";
				this.bottomNaviArea.appendChild(P);
			}
		}
		this.bottomNaviArea.innerHTML += "   =   ";

		if (i < (this.title.length -1)){
			if(this.title[i+1][0] == this.titleChar){			
				var N = document.createElement("A");	
				N.href = this.UrlNav(i+1); 
				N.text = "next -->";
				this.bottomNaviArea.appendChild(N);
			}
		}
		var links = this.bottomNaviArea.getElementsByTagName("a");
		if(links.length != 0){
			this.centralW.appendChild(this.bottomNaviArea);
		}
}

writeContent(extType, content , N){
		
		
			if (extType =="htm" || extType =="html"){
				this.centralW.innerHTML = content ;
			}else if(extType=="md"){	
				var conv = new showdown.Converter();
				this.centralW.innerHTML =  conv.makeHtml( content ) ;
			}else{
				this.centralW.innerHTML = "<h3>File \""+ this.url[N] +"\" format not allowed</h3>" ;
			}
			this.nodeScriptReplace(this.centralW);  // search for <script> in content and clone them to allow execution
			var links = this.centralW.getElementsByTagName("a");
			// add target =_blank to all external links
			var LOCAL = window.location.pathname ;
			for(var i=0, max=links.length; i < max; i++) {
				var LIENS = links[i].pathname ;
				if(LIENS != LOCAL) links[i].setAttribute('target', '_blank');
			}
			var imgs =this.centralW.getElementsByTagName("img");
			// add local directory to image src.
			for(var i = 0 ; i < imgs.length ; i++){
				var a =  document.createElement('a');
	 
				var SRCavant = imgs[i].src;
				a.href = SRCavant ;
					
				if(!a.pathname.includes(LOCAL)){ 
				// correctio path : in case of full path in source writen with trailing "/" (ex "/folder/image.png")
				// need to add LOCAL because / point on server root, not site root
					a.pathname = LOCAL + a.pathname ;
					SRCapres = a.href ; 
				}else{
					var U = this.url[N] ;
					var D = U.replace(/[^\/]*$/,"");		
					var re = new RegExp(window.location.hostname+LOCAL, 'g')		
					var SRCapres = SRCavant.replace(re,  window.location.hostname+LOCAL+D    ) ;
				}
				imgs[i].src = SRCapres ;
			}
			
			this.bottomNaviLinks(N);
}

fillCentral(i){	
	//remplissage du centralW
	var PARENT = this ;
	var file = this.url[i]
	var xhttp2 = new XMLHttpRequest();
	var extType = file.split('.').pop();
	
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 ) {
			if(this.status == 200){
				var content = xhttp2.responseText ;
				PARENT.writeContent(extType, content, i);
			}else{
				PARENT.writeContent("htm", "<h3>problem loading file \"" + file + "\" : server returned status = "+ this.status +" </h3> ", 0);
			}
		}
	}
	xhttp2.open("GET", file, true);
	xhttp2.send();

}

callPage( i){
				this.fillCentral(i);
				this.fillLeftCol(i);
}

requestFile(cible){
	var PARENT =this ;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			PARENT.url.push(cible); return 1;
		} else {
			return 0;
		}
	};	
	xhttp.open("GET", cible, false);// lecture synchrone du fichier
	xhttp.send();	
}

pageUniqueIdentifier(N){
	var j = N;
	while(this.title[j][0] == this.titleChar){	j-- ;}	/* search father */		
	var U =   this.title[j]+ "_" +  this.title[N];// generate a more or less unique identifier	
	var V = U.replace(/[\s#]/g,"_"); // replace white and "#" with "_"
	V = V.replace(/&[^&;]*;/g,''); // remove html entities
	var combining = /[\u0300-\u036F]/g;  // The 2 lines above replace diacritics by closest ascii char (ex : é --> e)
	var W = V.normalize('NFKD').replace(combining, '')  ;
	if (this.navLink.indexOf(W) == -1){
			return W ;
	}else{
		var i = 1 ;
		while(this.navLink.indexOf(W) != -1){
			W = W +'_'+ i;
			i++;
			return W ;
		}
	}
}

parseSubIndexTXT(dirName){
	
	var xhttp = new XMLHttpRequest();
	var PARENT =this ;
	// recherche du fichier index.m ou html, prmiere page du repertoire
	var options =["md","htm","html"]; var i = 0 ;
	do{
		var cible = dirName+"/index."+options[i];
	}while(this.requestFile(cible)==0)
	//================================================================//

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			/*Typical action to be performed when the document is ready:  */			
			var lines = xhttp.responseText.split('\n');
			PARENT.parseIndexTXT(lines,dirName);
		}
	};
	var cible = dirName+"/index.txt";
	xhttp.open("GET", cible, false);// lecture synchrone du fichier
	xhttp.send();	
}


parseIndexTXT(lines,dir){
	//console.log("dir = "+ dir);
	for(var i = 0; i < lines.length; i++){
		var line = lines[i];
		if(line[0] != this.commentChar ){ // strip comment lines //
			var fields = line.split(',');
			
			switch(fields.length)
			{
				case 0: break ;
				case 1: break;
				case 2 :
				this.toolTip.push("");
				case 3 :
				this.toolTip.push(fields[2].replace(/"/g,''));
				default :
				this.title.push(fields[0].replace(/"/g,''));
				var E = fields[1].split('.').pop(); // extension du fichier cible
				if(E == "md" || E == "htm" || E == "html"){
					var D = (dir == "" ? "" : dir +"/")
					var U = (D + fields[1]).replace(/\s/g,'');
					console.log(U);
					this.url.push(U);	// remove white char in url field
				}else{
					this.parseSubIndexTXT(fields[1]); // On point sur un repertoire, allez parser le index.txt du rep					
				}	
				var N = this.title.length - 1; 
				this.navLink.push( this.pageUniqueIdentifier(N));

			}	
		}	
	}
}
// tryGuessURL(Name, N){
	// console.log("STRANGE URL");
	// var bestGuess = -1 ;
	// for(var i = 0 ; i < this.navLink.length - 1 ; i++){
		// if(Name == this.navLink[i] ) {
			// /*Succes we foud a more or less correspondant page	*/
			// bestGuess = i ;	
			// console.log("SUCCES = " + i);
			// return bestGuess ;		
		// }
	// }
	// if(N >= 0   &&  Number.isInteger(N) ) {return N ;}
	// return bestGuess ;
// }


loadPageInGetUrl(){
	// decode index number at end aof URL field
	var queryString = document.location.hash;
	queryString =  queryString.replace(/[#\?]/g,'');	
	var searchParams = new URLSearchParams(queryString);
	var N = -1 ;
	var Name = "";
	if(searchParams.has("NAME")) var Name = searchParams.get("NAME");
	//if(searchParams.has("INDEX") ) N = parseInt( searchParams.get("INDEX"));
	if(!searchParams.has("NAME")  && !searchParams.has("INDEX")){
		this.callPage(0); 
		return ;
	}
	if(Name !="" ){
		var i = this.navLink.indexOf(Name) 
		if(i != -1){
				this.callPage(i); 
				return ;	
		}
	}
	
	this.writeContent("htm", "<h3>ERROR 404  : You use a broken link or the topic have been deleted </h3> "
	                          +"<br> visit  the home page -->  ", 0);	
	var goHome = this.genLink(0) ;
	this.centralW.appendChild(goHome)  ;
	
							  
	this.fillLeftCol(0);	
}
mainMenu(){
	var xhttp = new XMLHttpRequest();
	var PARENT =this ;
	var LOCAL = window.location.pathname ;
	console.log("LOCAL = " + LOCAL);
	// Cration du main menu
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// Typical action to be performed when the document is ready:
			var lines = xhttp.responseText.split('\n');
			PARENT.parseIndexTXT(lines, "");
	
			PARENT.main_menu.innerHTML = "";
			for (var i = 0 ; i < PARENT.title.length ; i++){
					//console.log("-> "+ this.title[i]);
				if(PARENT.title[i][0] != PARENT.titleChar){
					PARENT.main_menu.appendChild(PARENT.genLink(i));
				}
			}
			PARENT.loadPageInGetUrl();		
		}
	};
	xhttp.open("GET", "index.txt", true);
	xhttp.send();

}

}// FIN DE CLASSE 

function newRikiki(){
	site = new Rikiki ();
	// ==================================================== //
 // catch navigation event detect URL modif 
window.onpopstate = function(event) { 
	site.loadPageInGetUrl() ;
};
// ======================================================= //
}