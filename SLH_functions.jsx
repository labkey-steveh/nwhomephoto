﻿///////////////////////////////////////////////////////////////////////////////
// batchResize - the main function
///////////////////////////////////////////////////////////////////////////////
function saveJPEG( doc, saveFile, qty ) {
     var saveOptions = new JPEGSaveOptions( );
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty; 
     doc.saveAs( saveFile, saveOptions, true );
}

///////////////////////////////////////////////////////////////////////////////
// batchResize2 - an evolution of batchResize
///////////////////////////////////////////////////////////////////////////////
function batchResize2(sourcePath, sizesArray, destinationPath)
{
    var sourceFolder = new Folder(sourcePath);
	if (!sourceFolder.exists) 
    {
		alert('!sourceFolder.exists', 'Script Stopped', true);
		return;
	}
//	var sourceFiles = sourceFolder.getFiles("*.jpg");
	var sourceFiles = getFilesFunc(sourceFolder);
    
   // define what sizes you want to make
	var resizeArray = new Array()
	resizeArray[0] = 640;
	resizeArray[1] = 975;
	resizeArray[2] = 1024;
	resizeArray[3] = 1154;
	resizeArray[4] = 1200;
	resizeArray[5] = "full";
	
	// create the target folders
	var outputFolder = new Array(resizeArray.length);
	for(k=0;k<resizeArray.length;k+=1) {
		outputFolder[k] = new Folder(destinationPath + "\\JPEG_" + resizeArray[k]);
		if(!outputFolder[k].exists) outputFolder[k].create();
	}	

    //for(i=0; i < sourceFiles.length; i+=1) {
    //alert(sourceFiles[i].name);
    //    }
	
	if(sourceFiles.length > 0)
		for(i=0;i<sourceFiles.length;i+=1) {
			for(j=0;j<resizeArray.length;j+=1) {

                var doc = open(sourceFiles[i]);
                   if(resizeArray[j] != "full")
                  doc.resizeImage(UnitValue(resizeArray[j],"px"),null,null,ResampleMethod.BICUBIC);
                  doc.saveName = 1001 + i;
                  doc.flatten();
                  //app.displayDialogs = DialogModes.NO;
                  var saveFile = new File(outputFolder[j] + "/" + doc.saveName + "_" + resizeArray[j] + '.jpg')
                  saveJPEG( doc, saveFile, 10 );
                  doc.close(SaveOptions.DONOTSAVECHANGES);

			}
		}
	else alert("No files in the folder.");
}

function saveJPEG( doc, saveFile, qty ) {
     var saveOptions = new JPEGSaveOptions( );
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty; 
     doc.saveAs( saveFile, saveOptions, true );
}

///////////////////////////////////////////////////////////////////////////////
// getFiles - get all files within the specified source
///////////////////////////////////////////////////////////////////////////////
function getFilesFunc(sourceFolder) {
	// declare local variables
	var fileArray = new Array();
	var extRE = /\.(?:png|gif|jpg|bmp|tif|psd|cr2|dng)$/i;

	// get all files in source folder
	var docs = sourceFolder.getFiles();
	var len = docs.length;
	for (var i = 0; i < len; i++) {
		var doc = docs[i];

		// only match files (not folders)
		if (doc instanceof File) {
			// store all recognized files into an array
			var docName = doc.name;
			if (docName.match(extRE)) {
				fileArray.push(doc);
			}
		}
	}

	// return file array
	return fileArray;
}


function signalComplete(fileName){

        var doc = app.open(File("C:/Users/steve/Documents/Adobe Scripts/nwhomephoto/resources/kitten.jpg"));
		var saveFile = new File("C:/Users/steve/Documents/Adobe Scripts/nwhomephoto/build/" + fileName);
		saveJPEG( doc, saveFile, 1 );
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}


function saveTIFF(path, name){
	// saves the file as a TIFF
}
///////////////////////////////////////////////////////////////////////////////
// RAWtoPSD - the old main function, now deprecated.
///////////////////////////////////////////////////////////////////////////////
function RAWtoPSD(sourceFolder) {

    // user settings
	var prefs = new Object();
	prefs.sourceFolder         = 'C:\\Documents and Settings\\steveh2\\My Documents\\My Pictures\\';  // default browse location (default: '~')
	prefs.removeFileExtensions = true; // remove filename extensions for imported layers (default: true)
	prefs.savePrompt           = false; // display save prompt after import is complete (default: false)
	prefs.closeAfterSave       = false; // close import document after saving (default: false)

	// prompt for source folder
	//sourceFolder = Folder.selectDialog('Please select the folder to be imported:', Folder(prefs.sourceFolder));

	// read source folder from settings file
	myFolder = Folder(sourceFolder);

	// ensure the source folder is valid
	if (!myFolder) {
		return;
	}
	else if (!myFolder.exists) {
		alert('Source folder not found.', 'Script Stopped', true);
		return;
	}

   // make output folder
	var outputFolder = new Folder(myFolder + "\\PSD");
	if(!outputFolder.exists) outputFolder.create();

	// get a list of files
	var fileArray = getFiles(myFolder);

	// if files were found, proceed with processing
	if (fileArray.length) {
		processToPSDs(fileArray, outputFolder, prefs);
	}
	// otherwise, diplay message
	else {
		alert("The selected folder doesn't contain any recognized images.", 'No Files Found', false);
	}
}


///////////////////////////////////////////////////////////////////////////////
// processToPSDs - runs NoiseNinja, PTLens and saves a set of PSDs
// DEPRECATED old function that did a lot of image processing all-in-one.  Became too monlithic to use as this project evolved.
///////////////////////////////////////////////////////////////////////////////
function processToPSDs(fileArray, outputFolder, prefs) {
	// loop through all files in the source folder
	for (var i = 0; i < fileArray.length; i++) {
		var doc = open(fileArray[i]);
		saveFile = new File(outputFolder + "/" + doc.name);
        saveOptions = new PhotoshopSaveOptions(); 
        doc.saveAs(saveFile,saveOptions,true,Extension.LOWERCASE);
		doc.close(SaveOptions.DONOTSAVECHANGES);
	}	

	// create a signal file for Ant: RAW Processing Complete!.
	signalFile = new File(outputFolder + "/signalFile.txt");
	//signalFile.saveAs(saveFile,saveOptions,true,Extension.LOWERCASE);
}


function deleteBuildFolder(buildFolder){
	Folder(buildFolder).remove();
}

