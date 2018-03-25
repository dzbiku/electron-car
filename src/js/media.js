var fs = require('fs');
var output = [];
var pathFile = require('path');

document.getElementById('files').addEventListener('change', {}, false);

var filesGlobal;

function getfolder(e) {
  var files = e.target.files;
  var path = files[0].webkitRelativePath;
  var Folder = path.split("/");
}

var folder = document.getElementById("myInput");
folder.onchange=function(){
  var files = folder.files,
      len = files.length,
      i;
      filesGlobal = files[0].path;
  //for(i=0;i<len;i+=1){
    //console.log(files[i]);
  //}
}

document.getElementById('btn_file').onclick = function () {
  document.getElementById('myInput').click();
  //var seleftedFolder = "D:/Programowanie/Angular/AlngularCLI_kurs";
  var seleftedFolder = "D:/Video/YouTube/Alternator"; //D:\Video\YouTube\Alternator

  //getFiles(seleftedFolder);
  getFiles(filesGlobal);

  document.getElementById('file_images_display').innerHTML = seleftedFolder;

};

function getFiles(dir, fileList) {
  fileList = fileList || [];
  var first = true;
  var files = fs.readdirSync(dir);
  var nameToCheck = dir + '/' + files[i + 1];
  var contentToShowInPage;
  contentToShowInPage += '<details><summary>' + dir + '</summary>'; //for first Main- node

  files.sort();

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
      // contentToShowInPage += '<details style="margin-left:25px"><summary>' + name + '</summary><details>';
    } else {
      if (fileList == null)
        fileList.push(files[i]);
      else {
        console.log(pathFile.extname(files[i]));
        if (checkedMedia()) {
          if (pathFile.extname(files[i]) === ".mp3" || pathFile.extname(files[i]) === ".mp4" || pathFile.extname(files[i]) === ".webm")
            contentToShowInPage = setActionAndIcon(files, i, contentToShowInPage, name);
        }
        else
          contentToShowInPage = setActionAndIcon(files, i, contentToShowInPage, name);
        fileList.push(name);
      }
    }
  }
  contentToShowInPage += '</details>';
  document.getElementById('list').innerHTML = contentToShowInPage;
  return fileList;
}

window.onclick = e => {
  if (pathFile.extname(e.target.innerHTML) === ".mp3" || pathFile.extname(e.target.innerHTML) === ".mp4"||pathFile.extname(e.target.innerHTML) === ".webm") {
    document.getElementById('row_video_content').style.display = "block";
    if (pathFile.extname(e.target.innerHTML) === ".mp3")
      document.getElementById('video_id').setAttribute('height', '40px')
    if (pathFile.extname(e.target.innerHTML) === ".mp4")
      document.getElementById('video_id').setAttribute('height', 'auto')
      if (pathFile.extname(e.target.innerHTML) === ".webm")
      document.getElementById('video_id').setAttribute('height', 'auto')
    console.log('clicked element: ' + e.target.innerHTML);
    document.getElementById('labelOfClip').innerHTML = e.target.innerHTML;

    var video = document.getElementById('video_id');
    document.getElementById('video_id').innerHTML = '<source src="' + e.target.innerHTML + '" type="video/mp4">';
    video.load();
    video.play();
  }
}

function setActionAndIcon(files, i, contentToShowInPage, name) {
  if (pathFile.extname(files[i]) === ".txt" || pathFile.extname(files[i]) === ".log" || pathFile.extname(files[i]) === ".ipynb") {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/txt.png" alt="txt_logo" style="width:20px;" /><a href="#" onclick="window.open(\'' + name + '\'); return false;"">' + files[i] + '</a></div>';
  }
  else if (pathFile.extname(files[i]) === ".mp4") {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/mp4.png" alt="mp4_logo" style="width:20px;" /> <a href="#" class="video_clip" id="video_single_' + files[i] + '\'">' + name + '</a></div>';
  }
  else if (pathFile.extname(files[i]) === ".webm") {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/mp4.png" alt="mp4_logo" style="width:20px;" /> <a href="#" class="video_clip" id="video_single_' + files[i] + '\'">' + name + '</a></div>';
  }
  else if (pathFile.extname(files[i]) === ".mp3") {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/mp3_new.png" alt="mp3_logo" style="width:20px;" /> <a href="#" class="video_clip" id="video_single_' + files[i] + '\'">' + name + '</a></div>';
  }
  else if (pathFile.extname(files[i]) === ".doc" || pathFile.extname(files[i]) === ".docx" || pathFile.extname(files[i]) === ".xls" || pathFile.extname(files[i]) === ".xlsx") {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/office.png" alt="office_logo" style="width:20px;" /> <a href="#" onclick="window.open(\'' + name + '\'); return false;"">' + files[i] + '</a></div>';
  }
  else {
    contentToShowInPage += '<div style="margin-left:25px;"><img id="logo" src="../assets/images/not_know.png" alt="not_know_logo" style="width:20px;" /> ' + files[i] + '</div>';
  }
  return contentToShowInPage;
}

function checkedMedia() {
  var checkbox = document.getElementById('mediaFiles');
  console.log(checkbox.checked)
  return checkbox.checked;
}

mediaFiles.addEventListener('click', function (event) {
  document.getElementById('btn_file').click();
})