 YUI().use("node", "widget", function(Y) {

     function init() {
         var ss = new net.raj.SevenSeg({srcNode: "#seg1", "value": 8, "scale": 50, "colors.active.fill": "#00f"});
         ss.render();     
     
         var ss = new net.raj.SevenSeg({srcNode: "#seg2", "value": 0, "scale": 100, 
             "colors.active.fill": "#f00", "colors.active.outline": "#fff",
             "colors.inactive.fill": "#EDF5FF"});
         ss.render();
         var flag = 0;
         var counter = 0;
         
         var cycleColors = ["#f00", "#080", "#00f" ];
         setInterval(function() {
            counter++;
            ss.set("value", counter%10);
            ss.set("colors.active.fill", cycleColors[counter % 3]);
         }, 2000);
         
         
         var ids = ["hh1", "hh2", "mm1", "mm2", "ss1", "ss2"];
         var segs = new Array();
         for (var i=0; i<ids.length; i++) {
             var thisDigit = new net.raj.SevenSeg({srcNode: "#" + ids[i], scale: 20, 
                 colors: { 
                     active: {fill: "#88f", outline: "66ff"}, 
                     inactive: {fill: "#000", outline: "000"}
                 }
             });
             
             thisDigit.render();
             segs[ids[i]] = thisDigit;
         }
         
         ids = ["sep1", "sep2"];
         for (var i=0; i<ids.length; i++) {
             var sep = new net.raj.DigitSeparator({srcNode: "#" + ids[i], scale: 20, 
                 colors: { 
                     fill: "#88f", 
                     outline: "66ff" 
                 }
             });
             sep.render();         
         }
         
         setInterval(function() {
             var currentTime = new Date();
             var ss = currentTime.getSeconds();
             segs["ss1"].set("value", Math.floor(ss/10));
             segs["ss2"].set("value", ss%10);
             
             var mm = currentTime.getMinutes();
             segs["mm1"].set("value", Math.floor(mm/10));
             segs["mm2"].set("value", mm%10);
             
             var hh = currentTime.getHours();
             segs["hh1"].set("value", Math.floor(hh/10));
             segs["hh2"].set("value", hh%10);             
             
         }, 1000);
     }
     
     
     Y.on("domready", init);
     
 });
