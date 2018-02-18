var fs = require('fs');
var output = [];
var pathFile = require('path');

function handleFileSelect(evt) {
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function getfolder(e) {
  var files = e.target.files;
  var path = files[0].webkitRelativePath;
  var Folder = path.split("/");
}

document.getElementById('btn_file').onclick = function () {
  //document.getElementById('files').click();
  //var seleftedFolder = "D:/Programowanie/Angular/AlngularCLI_kurs";
  var seleftedFolder = "D:/Video/YouTube/Alternator"; //D:\Video\YouTube\Alternator

  getFiles(seleftedFolder);
  document.getElementById('file_images_display').innerHTML = seleftedFolder;

};

function getFiles(dir, fileList) {
  fileList = fileList || [];
  var first = true;
  var files = fs.readdirSync(dir);
  var nameToCheck = dir + '/' + files[i + 1];
  var contentToShowInPage;
  contentToShowInPage += '<details><summary>' + dir + '</summary>'; //for first Main- node

  for (var i in files) {
    if (!files.hasOwnProperty(i)) continue;
    var name = dir + '/' + files[i];

    if (fs.statSync(name).isDirectory()) {
      //for multifolder
      // if (!first) {
      //   contentToShowInPage += '</details>';
      // }
      // first = false;
      // getFiles(name, fileList);
      // contentToShowInPage += '<details style="margin-left:25px"><summary>' + name + '</summary>';
    } else {
      if (fileList == null)
        fileList.push(files[i]);
      else {
        if (pathFile.extname(files[i]) === ".txt" || pathFile.extname(files[i]) === ".log" || pathFile.extname(files[i]) === ".ipynb") {
          contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/txt.png" alt="mp4_logo" style="width:20px;" /><a href="#" onclick="window.open(\'' + name + '\'); return false;"">' + files[i] + '</a></div>';
        }
        else if (pathFile.extname(files[i]) === ".mp4") {
          contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/mp4.png" alt="mp4_logo" style="width:20px;" /> <a href="#" class="video_clip" id="video_single_' + files[i] + '\'">' + name + '</a></div>';
        }
        else if (pathFile.extname(files[i]) === ".mp3") {
          contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/mp3_new.png" alt="mp3_logo" style="width:20px;" /> <a href="#" class="video_clip" id="video_single_' + files[i] + '\'">' + name + '</a></div>';
        }
        else if (pathFile.extname(files[i]) === ".doc" || pathFile.extname(files[i]) === ".docx" || pathFile.extname(files[i]) === ".xls" || pathFile.extname(files[i]) === ".xlsx") {
          contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/office.png" alt="mp4_logo" style="width:20px;" /> <a href="#" onclick="window.open(\'' + name + '\'); return false;"">' + files[i] + '</a></div>';
        }
        //another content- in progress, what to do with files
        else {
          contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/not_know.png" alt="mp3_logo" style="width:20px;" /> ' + files[i] + '</div>';
        }
        fileList.push(name);
      }
    }
  }

  contentToShowInPage += '</details>';
  document.getElementById('list').innerHTML = contentToShowInPage;

  var spans = document.getElementsByClassName('video_clip'),
    obj = {};

  for (var iObj in spans) {
    if (isNaN(iObj) && iObj != 'item' && iObj != 'namedItem' && iObj != 'length') {
      var elementId = iObj;
      document.getElementById(elementId).addEventListener('click', function (event) {
        document.getElementById('row_video_content').style.display = "block";
        console.log("clip: " + document.getElementById(elementId).innerHTML);
      });
      //console.log(iObj);

    }
  }
  return fileList;
}

window.onclick = e => {
  if (pathFile.extname(e.target.innerHTML) === ".mp3" || pathFile.extname(e.target.innerHTML) === ".mp4") {
    if (pathFile.extname(e.target.innerHTML) === ".mp3")
      document.getElementById('video_id').setAttribute('height', '40px')
    if (pathFile.extname(e.target.innerHTML) === ".mp4")
      document.getElementById('video_id').setAttribute('height', 'auto')
    console.log('clicked element: ' + e.target.innerHTML);
    document.getElementById('labelOfClip').innerHTML = e.target.innerHTML;

    var video = document.getElementById('video_id');
    document.getElementById('video_id').innerHTML = '<source src="' + e.target.innerHTML + '" type="video/mp4">';
    video.load();
    video.play();
  }
}