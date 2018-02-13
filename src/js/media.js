function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<details><summary>', escape(f.name), '</summary>',
                  '<div style="margin-left:25px"> file type: ',
                  f.type ? f.type : 'n/a','</div>',
                  '<div style="margin-left:25px"> last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a','</div></details>');
    }
    document.getElementById('list').innerHTML = output.join('');

    //document.getElementById('list').innerHTML = '<details>' + output.join('') + '</details>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  function getfolder(e) {
    var files = e.target.files;
    var path = files[0].webkitRelativePath;
    var Folder = path.split("/");
    //alert(Folder[0]);
}

document.getElementById('btn_file').onclick = function() {
  document.getElementById('files').click();
};