function AddMainMenu(MenuList)
{
    var MLAry = MenuList.split(",");
    for(var i=0;i<MLAry.length;i++) {
        if (MLAry[i].substr(0,4)=='http')
        {
        	cols = MLAry[i].split("|");
        	MMAry[MMAry.length] = "<a href="+cols[0]+" >"+cols[1]+"</a>";
        	MMAry[MLAry[i]] = new Array();
      	} else {
        	MMAry[MMAry.length] = MLAry[i];
        	MMAry[MLAry[i]] = new Array();
      	}
    }
}

function AddSubMenu(MainMenuItem,MenuList)
{
    var SLAry = MenuList.split(",");

    for (var i = 0 ; i < SLAry.length ; i++)
        MMAry[MainMenuItem][MMAry[MainMenuItem].length] = SLAry[i];
}

function SetMenu()
{
    var MenuStr = "";
    var i;

    MenuStr += "<div class='MMType' id='toolbartitle' ><table ";
    MenuStr += " id='MainMenu' ><tr>";
    for(i = 0 ; i < MMAry.length ; i++) {
        MenuStr += "<td align=center width=" + MenuWidth;
        MenuStr += " OnMouseOver=\"SetSubMenu(\'" + MMAry[i] + "\');\"";
        MenuStr += " OnMouseout=\"HiddenMenu();\" class=MainStyle>" + MMAry[i];
        MenuStr += "</td>";
    }
    MenuStr += "</tr></table></div>";
    document.write(MenuStr);
}

function SetSubMenu(MainMenuItem)
{
    var MenuStr = "";
    var SubMenuDesc = "";
    var SubMenuLink = "";

    if (typeof(MMAry[MainMenuItem])!="undefined") {
      MenuStr += "<table border=0 cellpadding=3";
      MenuStr += " cellspacing=0 width='100'>";
      for (var i=0;i<MMAry[MainMenuItem].length;i++){
          if(MMAry[MainMenuItem][i] == "---"){
              MenuStr += "<tr><td><hr></td></tr>";
          } else {
              SubMenuDesc = MMAry[MainMenuItem][i].split("|")[0];
              SubMenuLink = MMAry[MainMenuItem][i].split("|")[1];
              MenuStr += "<tr><td align=left class=SubItem nowrap";
              MenuStr += " OnMouseOver=\"this.className='SubItemHover';\"";
              MenuStr += " OnMouseOut=\"this.className='SubItem';\"";
              MenuStr += " OnClick=\"gotoURL('"+SubMenuLink+"');\">"+SubMenuDesc;
              MenuStr += "</td></tr>";
          }
      }
      MenuStr += "</table>";
      for(var i=0;i<MMAry.length;i++){
          if(MainMenuItem==MMAry[i])
              break;
      }
      var SubMenuObj = document.getElementById("SubMenu")
      SubMenuObj.innerHTML = MenuStr;
      SubMenuObj.style.left = 30 + i * MenuWidth + 6;
      SubMenuObj.style.visibility = "inherit";
    }
}

function HiddenMenu()
{
    document.getElementById("SubMenu").style.visibility = "hidden";
}

function gotoURL(URL)
{
    location.href = URL;
}

function hideTagsbyClassName(name, cn)
{
    var obj = document.getElementsByTagName(name);
    var i;

    for (i = 0;i < obj.length; i++)
    {
        if(obj[i].className == cn)
        {
            obj[i].style.display = "none";
            obj[i].style.visibility = "hidden";
        }
    }
}

function showTagsbyClassName(name, cn)
{
    var obj = document.getElementsByTagName(name);
    var i;

    for (i = 0; i < obj.length; i++) {
        if(obj[i].className == cn) {
            obj[i].style.display = "";
            obj[i].style.visibility = "visible";
        }
    }
}

function AddId(str)
{
    return document.createElement(str);
}

function GetId(str)
{
    return document.getElementById(str);
}

/* ---------------- new function -------------------------------------------- */
function get_screen_mode(w, h)
{
	var pos = Array();
	scr = $.parseJSON(screen_text);

	for (i in scr) {
		for (x in scr[i]) {
			for (mode in scr[i][x]) {
				if (scr[i][x][mode]["x"] == w &&
					scr[i][x][mode]["y"] == h) {
					return Array(i, x, scr[i][x][mode]);
					break;
				}
			}
		}
	}
	pos["x"] = w;
	pos["y"] = h;
	return Array("unknown", "unknwon", pos);
}

var tf0, tf1, tf2, tf3;
var screen_mode = null;
var screen_text = '{ "iphone5": { "chrome": { "h": { "x": "568", "y": "256" }, "v": { "x": "320", "y": "504" } } }, "mac": { "chrome": { "h": { "x": "1290", "y": "1008" } } }, "anton-fedora": { "chrome": { "h": { "x": "1366", "y": "672" } } } }';

$(document.body).ready(function() {
    tf0 = document.tf0;
    tf1 = document.tf1;
    tf2 = document.tf2;
    tf3 = document.tf3;

	if (typeof(local_init) != "undefined") {
        local_init();
    } else if (typeof(init) != "undefined") {
        init();
    }
});
