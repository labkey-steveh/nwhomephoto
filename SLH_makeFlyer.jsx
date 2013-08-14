﻿#target photoshop

// Set the properties
#include "build_props.jsx"
#include "SLH_functions.jsx"

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// Set the ruler units to pixels 
// TODO: reset this at the end to the default.
var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

//  Create doc 2125 x 2750 pixels.
//  2125 x 2750 pixels = 8.5 x 11 inch doc at 250 pixels per inch
var docRef = app.documents.add(2125, 2750, 250, "My New Document");

//  Red Band on Top
fillArea(docRef, 0, 2125, 0, 375, 182, 32, 37);
// Red Band on Bottom
fillArea(docRef, 0, 2125, 2610, 2750, 182, 32, 37);

// General function that paints a rectangular area with a specified color.
function fillArea(targetDoc, x1, x2, y1, y2, r, g, b)
{
	targetDoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	var selRef = app.activeDocument.selection;
	var fillColor = new SolidColor();
	fillColor.rgb.red  = r;
	fillColor.rgb.green = g;
	fillColor.rgb.blue = b;
	selRef.fill( fillColor, ColorBlendMode.NORMAL, 100, false );
}

// Big Photos 

addPhoto(resizepath + "/JPEG_975", photo1, docRef, 65, 1040, 435, 1085);
addPhoto(resizepath + "/JPEG_975", photo2, docRef, 1075, 2050, 435, 1085);
// Small Photos
addPhoto(resizepath + "/JPEG_640", photo3, docRef, 65, 705, 1125, 1555);
addPhoto(resizepath + "/JPEG_640", photo4, docRef, 735, 1375, 1125, 1555);
addPhoto(resizepath + "/JPEG_640", photo5, docRef, 1410, 2050, 1125, 1555);
// Logo
addLogo("C:/dev/nwhomephoto_dev/ant_build/resources", "logo.psd", docRef, 1350, 2045, 2090, 2595);

// General function that pastes one doc into another as a layer.
function addPhoto (sourcefolder, pic, pastedoc, x1, x2, y1, y2)
{
    var folder = new Folder(sourcefolder);
    var picArray = getFilesFunc(folder);
    //var picArray = folder.getFiles();
    //for(i=0;i<=picArray.length;i++) {
        //alert(picArray[i].name);
        //}
    var sourcefile = open(new File( picArray[pic-1] ));
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=pastedoc; 
	pastedoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	pastedoc.paste(true);
	sourcefile.close();
}


// General function that pastes one doc into another as a layer.
function addLogo (sourcefolder, pic, pastedoc, x1, x2, y1, y2)
{ 
    var folder = new Folder(sourcefolder);
	var picArray = folder.getFiles();
    var sourcefile = open(new File( sourcefolder + '/' + pic ));
	sourcefile.selection.selectAll(); 
	sourcefile.selection.copy();
	activeDocument=pastedoc; 
	pastedoc.selection.select(new Array (new Array(x1,y1),new Array(x2,y1), new Array(x2,y2), new Array(x1,y2)), SelectionType.REPLACE, 0, false);
	pastedoc.paste(true);
	sourcefile.close();
}

// Headline #1
addLineText(docRef, 1065, 175, "headline1", 'ffffff', headline1, 24, true, true, Justification.CENTER);
// Headline #2
addLineText(docRef, 1065, 275, "headline2", 'ffffff', headline2, 24, false, true, Justification.CENTER);
// Headline #3
addLineText(docRef, 75, 1635, "headline3", '000000', headline3, 18, false, true, Justification.LEFT);
// Address
addLineText(docRef, 1370, 1625, "address", '000000', address, 10, true, false, Justification.LEFT);
// price
addLineText(docRef, 1384, 2025, "price", '000000', house_price, 18, false, false, Justification.LEFT);
// contact
addLineText(docRef, 75, 2650, "contact", 'ffffff', contact, 12, false, false, Justification.LEFT);
// website
addLineText(docRef, 1390, 2650, "website", 'ffffff', website, 12, false, false, Justification.LEFT);
// Presented By
addLineText(docRef, 75, 2595, "presentedby", '000000', presentedby, 12, false, false, Justification.LEFT);

function addLineText(targetDoc, x1, y1, layername, hexColor, text, fontsize, fauxbold, fauxitalic, justification)
{
	var textColor = new SolidColor;
    textColor.rgb.hexValue = hexColor;	
	var newTextLayer = targetDoc.artLayers.add();
	newTextLayer.name = layername;
	newTextLayer.kind = LayerKind.TEXT;
	newTextLayer.textItem.contents = text;
	newTextLayer.textItem.position = Array(x1, y1);
	newTextLayer.textItem.size = fontsize;
	newTextLayer.textItem.justification = Justification.LEFT;
	newTextLayer.textItem.fauxBold = fauxbold;
	newTextLayer.textItem.fauxItalic = fauxitalic;
	newTextLayer.textItem.justification = justification;
	newTextLayer.textItem.color = textColor;
}

// maintext
var textColor = new SolidColor;
//textColor.rgb.red = 0;
//textColor.rgb.green = 0;
//textColor.rgb.blue = 0;
var newTextLayer = docRef.artLayers.add();
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.name = "maintext";
//newTextLayer.textItem.contents = "Great price for so much space on Mercer Island. Private driveway leads to two car attached garage with room for RV or boat storage. The interior is clean and spacious with three bedrooms all on one level. Huge kitchen with large eating area. Formal dining room, large living room and separate family room. Two fireplaces. Gas heat with newer furnace. Large lot with sunny, western exposure. Private backyard has sunny SW exposure and is level and fully fenced. Easy commute to Seattle or Bellevue.";
newTextLayer.textItem.contents = maintext;
newTextLayer.textItem.kind=TextType.PARAGRAPHTEXT;
newTextLayer.textItem.position = Array(75, 1705);
// width and height values below are rendered at x3 value. 150 pixels here become 450 pixels plus in the flyer  Why?
// Because they are in 'points'.
newTextLayer.textItem.width = 350;
newTextLayer.textItem.height = 225;
newTextLayer.textItem.size = 11;
newTextLayer.textItem.hyphenation = false;
//newTextLayer.textItem.color = textColor;
//newTextLayer.textItem.justification = Justification.LEFT;

// boxtext
var textColor = new SolidColor;
//textColor.rgb.red = 0;
//textColor.rgb.green = 0;
//textColor.rgb.blue = 0;
var newTextLayer = docRef.artLayers.add();
newTextLayer.name = "boxtext";
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.textItem.kind=TextType.PARAGRAPHTEXT;
newTextLayer.textItem.position = Array(1385, 1705);
// width and height values below are rendered at x3 value. 150 pixels here become 450 pixels plus in the flyer  Why?
newTextLayer.textItem.width = 150;
newTextLayer.textItem.height = 75;
newTextLayer.textItem.size = 12;
//newTextLayer.textItem.color = textColor;
//newTextLayer.textItem.justification = Justification.LEFT;
newTextLayer.textItem.contents = boxtext;

//addAreaText(docRef, myFile);

function addAreaText(targetDoc, sourceFile)
{
	//maybe try this style:	
	var sourceDoc = sourceFile;
	app.activeDocument = sourceDoc;
	activeDocument.activeLayer = activeDocument.artLayers.getByName('name of the textlayer');
	activeDocument.activeLayer.duplicate(targetDoc); 
}

//saveTIFF();
//saveJPEG();
//savePDF();

signalComplete("xxx-flyer-done-xxx.jpg");