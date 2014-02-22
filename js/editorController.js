      function addSeatType(addFromTemplate) {

        addFromTemplate = addFromTemplate || false;

        if(!addFromTemplate) {
          $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">New Ticket Type</span></span><span value="+ seatTypeCount +" style=\"padding-left:10px\"><span onclick=\"changePrice(this)\">300</span></span></div></li>" );
          modeName.push('New Ticket Type');
          modePrice.push(300);
        } else {
          if(seatTypeCount != 0) {
           $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">"+ modeName[seatTypeCount] + "</span></span><span value="+ seatTypeCount +" style=\"padding-left:10px\"><span onclick=\"changePrice(this)\">" + modePrice[seatTypeCount] +"</span></div></li>" );
         } else {
            $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">"+ modeName[seatTypeCount] + "</span></div></li>" );         
         }
        }
        seatTypeCount++;
      }



      function changeText(target) {
        target.parentNode.innerHTML = "<input type='text' value='" + target.innerHTML  + "'/><button onclick='textOK(this.parentNode)'>OK</button>";
      }

      function changePrice(target) {
        target.parentNode.innerHTML = "<input type='text' value='" + target.innerHTML  + "'/><button onclick='priceOK(this.parentNode)'>OK</button>";       
      }

      function textOK(target) {
        var newValue = target.firstChild.value;
        target.innerHTML = "<span onclick=\"changeText(this)\">" + newValue + "</span>";
        modeName[target.getAttribute('value')] = newValue;
      }

      function priceOK(target) {
        var newValue = target.firstChild.value;
        target.innerHTML = "<span onclick=\"changePrice(this)\">" + newValue + "</span>";
        modePrice[target.getAttribute('value')] = newValue;
      }

function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
}
return "";
}
