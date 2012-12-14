 YUI().use("node", "widget", function(Y) {
     
     /**
      * A seven segment display widget that displays a single digit.
      * The digit's scale, value and display colors are configurable.
      * @author Raj, http://geekraj.com
      */
     function SevenSeg(config) {
         SevenSeg.superclass.constructor.apply(this, arguments);
     }
     
     SevenSeg.NAME = "sevenseg";
     
     /**
      * Attributes for the seven segment display.
      */
     SevenSeg.ATTRS = {
         /**
          * Value of the seven segment display. This can be set to change
          * the displayed digit. Default value is 8 (all segments light up)
          */
         value : {
             value: 8   
         },
         
         /**
          * Scale of the widget.
          * The widget takes up a width of 1*scale and a height of 2.45*scale.
          */
         scale: {
             value: 50  // default scale is 50x.
         },
         
         /**
          * Colors for the segments. 
          *  - for lighted segments: colors.active.fill, colors.active.outline 
          *  - for inactive segments: colors.inactive.fill, colors.inactive.outline
          */
         colors: {
             value: { 
                 active: {
                    fill: "#000",
                    outline: "#eee"
                 },
                 inactive: {
                     fill: "#fff",
                     outline: "#eee"
                 }                 
             }
         }
     }; 
     
     SevenSeg.SEGIDX = ['a','b','c','d','e','f','g'];
     
     // Map of digits to segments that are lit. 
     SevenSeg.DIGITMAP = {
         "0": "abcdef", "1": "bc", "2": "abged", "3": "abcdg",
         "4": "bcfg", "5": "afgcd", "6": "afedcg", "7": "abc",
         "8": "abcdefg", "9": "abcdfg", "":""
     };
     
     Y.extend(SevenSeg, Y.Widget, {
         
         renderUI : function() {
             this._draw7seg();
         },
         
         bindUI : function() {
             this.after("valueChange", this._afterValueChange);
         },
         
         syncUI : function() {
             this._setDigit(this.get("value"));             
         },
         
         _afterValueChange : function(e) {
             this._setDigit(e.newVal);
         },
         
         _clear: function() {
             for (var i=0; i<7; i++) {
                 var thisseg = this.segments[SevenSeg.SEGIDX[i]];                 
                 thisseg.attr("fill", this.get("colors.inactive.fill"));
                 thisseg.attr("stroke", this.get("colors.inactive.outline"));
              }               
         },
         
         _setDigit: function(n) {
             this._clear();
             var chosenSegs = SevenSeg.DIGITMAP[n];
             for (var i=0; i<chosenSegs.length; i++) {
                var x = chosenSegs.charAt(i);
                var thisseg = this.segments[x];                                 
                thisseg.attr("fill", this.get("colors.active.fill"));
                thisseg.attr("stroke", this.get("colors.active.outline"));                
             }
          },         
         
         /**
          * Draw a 7 segment display using Raphael canvas.
          */
         _draw7seg: function() {
             var contentBox = this.get("contentBox");
             var scale = this.get("scale");
             var paper = Raphael(contentBox._node, scale*1.3, scale*2.3);
             var seg = paper.path("M 0 0 L 0.15 0.1 L 0.85 0.1 L 1.0 0 L 0.85 -0.1 L 0.15 -0.1 Z");
             
             var tx = 0.15*scale;
             var ty = 0.15*scale;

             this.segments = new Array();
             for (var i=0; i<7; i++) {
                var thisseg = this.segments[SevenSeg.SEGIDX[i]] = seg.clone();
                thisseg.scale(scale, scale);
             }

             seg.remove();             
             
             var segs = this.segments;
             segs['a'].translate(tx + scale/2, ty);

             segs['b'].rotate(90);
             segs['b'].translate(tx + scale, scale/2 + ty);

             segs['c'].rotate(90);
             segs['c'].translate(tx + scale, scale/2 + ty + scale);

             segs['d'].translate(tx + scale/2, 2*scale + ty);

             segs['e'].rotate(90);
             segs['e'].translate(tx + 0, scale/2 + ty + scale);

             segs['f'].rotate(90);
             segs['f'].translate(tx, scale/2 + ty);

             segs['g'].translate(tx + scale/2, ty + scale);             
         }
         
     });
     
     /**
      * A digit separator widget for creating a digital clock 
      */
     function DigitSeparator() {
         DigitSeparator.superclass.constructor.apply(this, arguments);
     }
     
     DigitSeparator.NAME = "digit-sep";
     
     DigitSeparator.ATTRS = {
         
         scale: {
             value: 50  // default scale is 50x.
         },
         
         colors: {
             value: { 
                 fill: "#000",
                 outline: "#eee"              
             }
         }
     };
     
     Y.extend(DigitSeparator, Y.Widget, {
         renderUI : function() {
             var contentBox = this.get("contentBox");
             var scale = this.get("scale");
             var paper = Raphael(contentBox._node, scale*0.3, scale*2.45);

             var c1 = paper.circle(scale*0.15, scale*0.75, scale*0.1);
             c1.attr("fill", this.get("colors.fill"));
             c1.attr("stroke", this.get("colors.outline"));      
             
             var c2 = paper.circle(scale*0.15, scale*1.55, scale*0.1);
             c2.attr("fill", this.get("colors.fill"));
             c2.attr("stroke", this.get("colors.outline"));                
         }
     });
     
     net = {};
     net.raj = {};
     
     net.raj.SevenSeg = SevenSeg;
     net.raj.DigitSeparator = DigitSeparator;
     
 });