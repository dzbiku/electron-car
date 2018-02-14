var fs = require('fs');
var output = [];
var pathFile = require('path');

function handleFileSelect(evt) {
  //var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.

  // for (var i = 0, f; f = files[i]; i++) {
  //   output.push('<details><summary>', escape(f.name), '</summary>',
  //     '<div style="margin-left:25px"> file type: ',
  //     f.type ? f.type : 'n/a', '</div>',
  //     '<div style="margin-left:25px"> last modified: ',
  //     f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</div></details>');
  // }
  // document.getElementById('list').innerHTML = output.join('');   

  //

  // var path = files[0].webkitRelativePath;
  // var Folder = path.split("/");
  //alert(path)
  //getListOfFilesInFolder("D:\\Projekty\\Electron\\electron-car-camera-rec\\electron-car-camera-rec");
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function getfolder(e) {
  var files = e.target.files;
  var path = files[0].webkitRelativePath;
  var Folder = path.split("/");
}

document.getElementById('btn_file').onclick = function () {
  //document.getElementById('files').click();
  getFiles("D:/MGR");
};


function getFiles(dir, fileList) {
  fileList = fileList || [];

  var files = fs.readdirSync(dir);
  var nameToCheck = dir + '/' + files[i + 1];
  var contentToShowInPage;
  contentToShowInPage += '<details><summary>' + dir + '</summary>';
  for (var i in files) {
    if (!files.hasOwnProperty(i)) continue;
    var name = dir + '/' + files[i];
    
    if (fs.statSync(name).isDirectory()) {
      contentToShowInPage += '</details>';
      getFiles(name, fileList);
      contentToShowInPage += '<details style="margin-left:25px"><summary>' + name + '</summary>';
    } else {
      if (fileList == null)
        fileList.push(files[i]);
      else {
        if (pathFile.extname(files[i]) === ".txt" ||pathFile.extname(files[i]) === ".log" || pathFile.extname(files[i]) === ".ipynb" ) {
          contentToShowInPage += '<div style="margin-left:25px;"> <a href="#" onclick="window.open(\'' + name + '\'); return false;" style="float: left;">' + files[i] + '</a></div></br>';
        }
        else {
          contentToShowInPage += '<div style="margin-left:25px;">f: ' + files[i] + '</div>';
        }
        fileList.push(name);
      }
    }
  }
  contentToShowInPage += '</details>';
  document.getElementById('list').innerHTML =contentToShowInPage;
  return fileList;
}