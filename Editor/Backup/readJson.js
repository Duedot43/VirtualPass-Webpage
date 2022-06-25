const readFileAsText = function () {
    const fileToRead = document.getElementById('file-to-read').files[0]
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function (fileLoadedEvent) {
        const text = fileLoadedEvent.target.result
        var backJson = atob(text);
        var backArr = JSON.parse(backJson);
        console.log(backArr)
        
    })

    fileReader.readAsText(fileToRead, 'UTF-8')
}