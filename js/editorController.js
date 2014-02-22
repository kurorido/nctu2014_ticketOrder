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