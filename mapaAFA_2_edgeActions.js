/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/

//Declarin global variables
// You cannot set the variable values because the object Stage hasn't been created
// set values in "compositionReady" funtion

// Set a Global variable for the height of the stage

var stageHeight; 
var stageWidth;  

// Global CrossHair Vars
var crssHairExt;
var crssHairInt;
var speedButton;
var crssHairSpeed;
var showTargetOpacity;

// Map and picture thumbnail
var map;
var thumb;
var genPhoto;
var imageText;
var imageCount = 1;
var numOfPhotos = 5;
var photoPath;
var nextButton;
var prevButton;

//Buttons 
var closeBtn;
var button_8;
var bt8_position = {
    			posX: 235,
    			posY: 210,
    			mapPosX: -180,
    			mapPosY: 110,
    			scale: 3
			};
var button_7;
var bt7_position = {
    			posX: 540,
    			posY: 362,
    			mapPosX: -1000,
    			mapPosY: -300,
    			scale: 3
			};


//Array Scale Elems
var scaleMapElems = new Array();

//-------------------------------------  EXTERNAL FUNCTIONS -----------------------------------------------			

// Scale Map,... and any other element defined in the 'elems' array 			
function scaleMap(elems, checkThumb){
					
		for (var i = 0, limit = elems[0].length; i < limit; i++) {
			
			// if its the last element to scale up (show thumbnail)							
			if(i+1 == limit && checkThumb)
				{
					TweenMax.to(elems[0][i], 0.5, {css:{x:elems[1], y:elems[2], scale:elems[3]}, ease:Sine.easeOut, onComplete:showThumb});
					function showThumb(){
						TweenMax.to(thumb, 0.3, {css:{x:0, y:0, scale:1, opacity:1}, ease:Sine.easeOut});
					}
				}
			//if its the last element to scale down (hide thumbnail)	
			else if (i+1 == limit && !checkThumb)
				{	
					TweenMax.to(thumb, 0.3, {css:{x:0, y:0, scale:0.8, opacity:0}, ease:Sine.easeOut, onComplete:hideThumb, onCompleteParams:[elems[0][i]]});
					function hideThumb(elem){
						TweenMax.to(elem, 0.5, {css:{x:elems[1], y:elems[2], scale:elems[3]}, ease:Sine.easeOut});
					}
					//reset pictures order
					imageCount = 1;
				}
			//scale elements that come first	
			else
				{	
					TweenMax.to(elems[0][i], 0.5, {css:{x:elems[1], y:elems[2], scale:elems[3]}, ease:Sine.easeOut} );
				}			
		}//for
}//scaleMap()

// Show target on any button mouseover 
function showTarget (posX, posY, speed){
	
	// make sure its hidden... like super fast 
	if(1){
	TweenMax.to(crssHairExt, 0.001, {css:{x:posX, y:posY, rotation:'0'}, startAt:{x:posX, y:posY}, ease:Sine.easeOut });
	TweenMax.to(crssHairExt, 0.001, {css:{opacity:0}, ease:Sine.easeOut});
	TweenMax.to(crssHairExt, 0.001, {css:{scale:1.5}});
	
	TweenMax.to(crssHairInt, 0.001, {css:{x:posX, y:posY, rotation:'0'}, startAt:{x:posX, y:posY}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, 0.001, {css:{opacity:0}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, 0.001, {css:{scale:0.1}});
	}
	
	// now the transition
	TweenMax.to(crssHairExt, speed, {css:{x:posX, y:posY, rotation:'360'}, startAt:{x:posX, y:posY}, ease:Sine.easeOut });
	TweenMax.to(crssHairExt, speed, {css:{opacity:showTargetOpacity}, ease:Sine.easeOut});
	TweenMax.to(crssHairExt, speed, {css:{scale:1}});
	
	TweenMax.to(crssHairInt, speed, {css:{x:posX, y:posY, rotation:'-360'}, startAt:{x:posX, y:posY}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, speed, {css:{opacity:showTargetOpacity}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, speed, {css:{scale:1}});
	
}

// Hide target on any button mouseOut
function hideTarget (posX, posY, speed){

	TweenMax.to(crssHairExt, speed, {css:{x:posX, y:posY, rotation:'0'}, ease:Sine.easeOut});
	TweenMax.to(crssHairExt, speed, {css:{opacity:0}, ease:Sine.easeOut});
	TweenMax.to(crssHairExt, speed, {css:{scale:1.5}});	
	
	TweenMax.to(crssHairInt, speed, {css:{x:posX, y:posY, rotation:'0'}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, speed, {css:{opacity:0}, ease:Sine.easeOut});
	TweenMax.to(crssHairInt, speed, {css:{scale:0.1}});

}

function initCrossHair()
{

	crssHairExt.css('opacity', '00');
   crssHairInt.css('opacity', '00');

   crssHairExt.css('transform', 'rotate(0deg)');
   crssHairExt.css('-moz-transform', 'rotate(0deg)');
   crssHairExt.css('-webkit-transform', 'rotate(0deg)');
   crssHairExt.css('-o-transform', 'rotate(0deg)');

   crssHairInt.css('transform', 'rotate(0deg)');
   crssHairInt.css('-moz-transform', 'rotate(0deg)');
   crssHairInt.css('-webkit-transform', 'rotate(0deg)');
   crssHairInt.css('-o-transform', 'rotate(0deg)');
   
   crssHairExt.css('transform', 'scale(1.5)');
   crssHairExt.css('-moz-transform', 'scale(1.5)');
   crssHairExt.css('-webkit-transform', 'scale(1.5)');
   crssHairExt.css('-o-transform', 'scale(1.5)');

   crssHairInt.css('transform', 'scale(0.1)');
   crssHairInt.css('-moz-transform', 'scale(0.1)');
   crssHairInt.css('-webkit-transform', 'scale(0.1)');
   crssHairInt.css('-o-transform', 'scale(0.1)');
   
}

//Creation Complete functions

function loadSlideShow(fotoPath, myText)
{
	//alert(myText)
	var photoFileName = photoPath.split('/')[1];
	imageCount = parseInt(photoFileName.split('.')[0]);
	//alert(imageCount);
	genPhoto.attr('src', 'images/'+fotoPath);
	imageText.html(myText);
}

function scrollSlideShow(hop)
{	
	imageCount += hop;
	//alert(imageCount);
	
	if (imageCount > numOfPhotos){ imageCount = 1; };
	if (imageCount < 1){ imageCount = numOfPhotos; };
	
	//onComplete:hideThumb, onCompleteParams:[elems[0][i]]
	TweenMax.to(genPhoto, 0.2, {css:{opacity:0}, ease:Sine.easeOut, onComplete:fadePicture});
	function fadePicture(){
		// photoPath MUST repeat MUST have only one '/' like -> 'folder/file_name.ext and all images must be jpg'	
		var photosFolder = photoPath.split('/')[0];
		var photoFileName = photoPath.split('/')[1];
		
		genPhoto.attr('src', 'images/'+photosFolder+'/'+imageCount+'.jpg');
		genPhoto.load(function(){TweenMax.to(genPhoto, 0.2, {css:{opacity:1}, ease:Sine.easeOut});});
		
	}
}



//-------------------------------------  /EXTERNAL FUNCTIONS -----------------------------------------------	

(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      // insert code to be run when the composition is fully loaded here
      //firstly set an accessible reference to stage and stageParent
      
     	var scaledStage = false ;      

      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
yepnope({
    nope:['edge_includes/hammer.js'] ,
    complete: init
});         

function init (){

    //alert('inited')

    // Get the actual dom element from the jquery object. Yeah! Its an array
    var element = sym.$('genPhoto')[0];
   // var elementNextBtn = sym.getSymbol("next").$("nextRect")[0];
    //var elementPrevBtn = sym.getSymbol("prev").$("prevRect")[0];

    //alert(element);
    var hammer = Hammer(element);
    //var hammer = Hammer(elementNextBtn);
    //var hammer = Hammer(elementPrevBtn);
    //alert(element);

    hammer.on("swipeleft", function(event) {

          sym.$('prev').click();
    });

    hammer.on("swiperight", function(event) {

          sym.$('next').click();
    });
    
   
}

         // ready for filling global var stage dimentions
         stageHeight = sym.$('Stage').height(); // Get value of the Stage height
         stageWidth = sym.$('Stage').width(); // Get value of the Stage width

         //Check if this function is obsolete :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
         // make a note out of this one
         sym.$('Stage').css({

         	"webkit-transform-origin":"0 0"

         })

         function scaleStage() {

             var stage = sym.$('Stage'); // Set a reusable variable to reference the stage
             var parent = sym.$('Stage').parent();
             var parentWidth = stage.parent().width();

             stageHeight = sym.$('Stage').height(); // Get value of the Stage height
        		 stageWidth = sym.$('Stage').width(); // Get value of the Stage width
        		 var ratio = (640 / 800); //this has to be changed eventually
        		 var scalerado = (parentWidth/stageWidth);
        		 var ref = sym.$('Ref');
				ref.html(scalerado+' '+parentWidth+' '+stageWidth);
         	stage.css('webkit-transform', 'scale('+scalerado+ ')');

         }

         // Make it happen when the browser resizes
         $(window).on('resize', function(){ 
         	 scaleStage(); 
         });

         // Make it happen when the page first loads
         $(document).ready(function(){
             scaleStage();
         });

         //-----------

         // ready for filling global var crosshair elements
         window.crssHairInt = sym.$("crossHairInt");
			window.crssHairExt = sym.$("crossHairExt");
			initCrossHair();

			window.speedButton = 0.2;

			crssHairSpeed = 1;

			showTargetOpacity = 0.4;

         //map variables
			map = sym.$("map");

			//picture thumbnail variables
			thumb = sym.$("RoundRect");
			thumb.css({
   			   '-moz-transform': 'scale(' + 0.8 + ')',
    				'-webkit-transform': 'scale(' + 0.8 + ')',
			});
			thumb.css({ opacity: 0 });


			var alojamento_txt = sym.$("alojamentos");

			//Button vars
			button_8 = sym.$("button_8");
			button_7 = sym.$("button_7");
			closeBtn = sym.$("closeBtn");

			// Photo vars
			genPhoto = sym.$("genPhoto");
			imageText = sym.$("imageText");
			imageText.html('this is the initial text');

			nextButton = sym.getSymbol("next").$("nextRect");
			prevButton = sym.getSymbol("prev").$("prevRect");

			nextButton.css({'opacity': 0.0 });
			prevButton.css({'opacity': 0.0 });








      });
      //Edge binding end

            Symbol.bindElementAction(compId, symbolName, "${_button_8}", "click", function(sym, e) {
        // insert code for mouse click here
        window.scaleMapElems = [
        									[window.map],
        									bt8_position['mapPosX'],
        									bt8_position['mapPosY'],
        									bt8_position['scale']
        								];
        
        var showThumb = true;
        photoPath = '08_alojamentos/1.jpg';
        var sliderText = 'this is 8 right';
        
        loadSlideShow(photoPath, sliderText);
        
        
        scaleMap(window.scaleMapElems, showThumb);
        hideTarget(bt8_position["posX"], bt8_position["posY"], 0.2);
        showTargetOpacity = 0;

      });
         //Edge binding end



      

      Symbol.bindElementAction(compId, symbolName, "${_afa_top_2}", "click", function(sym, e) {
         // insert code for mouse click here
         
         // sort of dispatches click event
         
         var scale = 1;
         var mapXposition = 0;
         var mapYPosition = 0;
         
         window.scaleMapElems = [
         									[window.map],
         									mapXposition,
         									mapYPosition,
         									scale
         								];
         
         var showThumb = false;
         
         scaleMap(window.scaleMapElems, showThumb);
         showTargetOpacity = 0.4;

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_button_8}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         
         showTarget(bt8_position["posX"], bt8_position["posY"], crssHairSpeed);
         
         var circle = sym.getSymbol("button_8").$("imageMap");
         var btn_text = sym.getSymbol("button_8").$("buttonText");
         TweenMax.to(btn_text, speedButton, {css:{x:10}, ease:Sine.easeOut});
         TweenMax.to(circle, speedButton, {css:{scale:1.2}, ease:Sine.easeOut});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_button_8}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         
         hideTarget(bt8_position["posX"], bt8_position["posY"], crssHairSpeed);
         
         var circle = sym.getSymbol("button_8").$("imageMap");
         var btn_text = sym.getSymbol("button_8").$("buttonText");
         TweenMax.to(btn_text, speedButton, {css:{x:0}, ease:Sine.easeOut});
         TweenMax.to(circle, speedButton, {css:{scale:1}, ease:Sine.easeOut});
         

      });
      //Edge binding end
  

      

      Symbol.bindElementAction(compId, symbolName, "${_button_7}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         
         showTarget(bt7_position["posX"], bt7_position["posY"], crssHairSpeed);
         
         var circle = sym.getSymbol("button_7").$("imageMap");
         var btn_text = sym.getSymbol("button_7").$("buttonText");
         TweenMax.to(btn_text, speedButton, {css:{x:10}, ease:Sine.easeOut});
         TweenMax.to(circle, speedButton, {css:{scale:1.2}, ease:Sine.easeOut});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_button_7}", "click", function(sym, e) {
         // insert code for mouse click here
         scaleMapElems = [
         									[map],
         									bt7_position['mapPosX'],
         									bt7_position['mapPosY'],
         									bt7_position['scale']
         								];
         
         var showThumb = true;
         photoPath = '07_salas_aula/5.jpg';
         var sliderText = 'this is 7 right';
         
         loadSlideShow(photoPath, sliderText);
         
         scaleMap(scaleMapElems, showThumb);
         hideTarget(bt7_position["posX"], bt7_position["posY"], 0.2);
         showTargetOpacity = 0;

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_button_7}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         
         hideTarget(bt7_position["posX"], bt7_position["posY"], crssHairSpeed);
         
         var circle = sym.getSymbol("button_7").$("imageMap");
         var btn_text = sym.getSymbol("button_7").$("buttonText");
         TweenMax.to(btn_text, speedButton, {css:{x:0}, ease:Sine.easeOut});
         TweenMax.to(circle, speedButton, {css:{scale:1}, ease:Sine.easeOut});

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${_next}", "click", function(sym, e) {
         // insert code for mouse click here
         scrollSlideShow(1);

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_prev}", "click", function(sym, e) {
         // insert code for mouse click here
         scrollSlideShow(-1);

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${_frame}", "touchmove", function(sym, e) {
         // insert code to be run when a user drags an object (for touch devices only)
         
      });
      //Edge binding end

      

      

      Symbol.bindElementAction(compId, symbolName, "${_close}", "click", function(sym, e) {
         // insert code for mouse click here
         var scale = 1;
         var mapXposition = 0;
         var mapYPosition = 0;
         
         scaleMapElems = [
         									[map],
         									mapXposition,
         									mapYPosition,
         									scale
         								];
         
         var showPic = false;
         
         scaleMap(scaleMapElems, showPic);
         showTargetOpacity = 0.4;

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_areaPrev}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         
         TweenMax.to(prevButton, 0.5, {css:{opacity:0.4}, ease:Sine.easeOut});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_areaNext}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         
         TweenMax.to(nextButton, 0.5, {css:{opacity:0.4}, ease:Sine.easeOut});

      });
      //Edge binding end 
           Symbol.bindElementAction(compId, symbolName, "${_areaNext}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         TweenMax.to(nextButton, 0.5, {css:{opacity:0.0}, ease:Sine.easeOut});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_areaPrev}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         TweenMax.to(prevButton, 0.5, {css:{opacity:0.0}, ease:Sine.easeOut});

      });
      //Edge binding end



   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'button_8'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "click", function(sym, e) {
         
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "mouseover", function(sym, e) {
         
         // sym.$("name") resolves an Edge Animate element name to a DOM
         // element that can be used with jQuery
         
         var thisElement = sym.$("imageMap");
         thisElement.css('cursor','pointer');

      });
         //Edge binding end

      

   })("button_8");
   //Edge symbol end:'button_8'

   //=========================================================
   
   //Edge symbol: 'button_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "click", function(sym, e) {
         
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "mouseover", function(sym, e) {
         
         // sym.$("name") resolves an Edge Animate element name to a DOM
         // element that can be used with jQuery
         

      });
            //Edge binding end

      })("button_7");
   //Edge symbol end:'button_7'

   //=========================================================
   
   //Edge symbol: 'button_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "click", function(sym, e) {
         
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_imageMap}", "mouseover", function(sym, e) {
         
         // sym.$("name") resolves an Edge Animate element name to a DOM
         // element that can be used with jQuery
         
         var thisElement = sym.$("imageMap");
         thisElement.css('cursor','pointer');

      });
            //Edge binding end

      })("button_1");
   //Edge symbol end:'button_1'

   //=========================================================
   
   //Edge symbol: 'next'
   (function(symbolName) {   
   
   })("next");
   //Edge symbol end:'next'

   //=========================================================
   
   //Edge symbol: 'prev'
   (function(symbolName) {   
   
   })("prev");
   //Edge symbol end:'prev'

   //=========================================================
   
   //Edge symbol: 'swiper'
   (function(symbolName) {   
   
   })("swiper");
   //Edge symbol end:'swiper'

})(jQuery, AdobeEdge, "EDGE-1014148");