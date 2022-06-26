const readFileAsText = function () {
    const fileToRead = document.getElementById('file-to-read').files[0]
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function (fileLoadedEvent) {
        const text = fileLoadedEvent.target.result
        var backJson = atob(text);
        window.backArr = JSON.parse(backJson);
        
    })

    fileReader.readAsText(fileToRead, 'UTF-8')
}
function exportFile() {
    for (id in window.entry_id){
        var config_var = id.split("-");
        var section = window.entry_id[id]["section"]
        window.backArr['config'][section][config_var[1]] = document.getElementById(id).value;
    }
    download("new_backup.vp", btoa(JSON.stringify(window.backArr)));
}
function download(filename, textInput) {

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    //document.body.appendChild(element);
    element.click();
    //document.body.removeChild(element);
}
