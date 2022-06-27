const readFileAsText = function () {
    const fileToRead = document.getElementById('file-to-read').files[0]
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function (fileLoadedEvent) {


        const text = fileLoadedEvent.target.result
        var backJson = atob(text);
        window.backArr = JSON.parse(backJson);
        disp_data();
    })

    fileReader.readAsText(fileToRead, 'UTF-8')
}
getParameters = () => {

    // Address of the current window
    address = window.location.search

    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)

    // Created a map which holds key value pairs
    let map = new Map()

    // Storing every key value pair in the map
    parameterList.forEach((value, key) => {
        map.set(key, value)
    })

    // Returning the map of GET parameters
    return map
}
window.gets = getParameters();
if (typeof window.gets.get('file') !== 'undefined') {
    var backJson = atob(window.gets.get('file'));
    window.backArr = JSON.parse(backJson);
    disp_data();
}
function disp_data() {
    var ids = '{"config-admin_uname":{"section":"administrator_portal"}, "config-admin_passwd":{"section":"administrator_portal"}, "config-override_automatic_domain_name":{"section":"domain_overrides"}, "config-domain_name":{"section":"domain_overrides"}, "config-teacher_uname":{"section":"teacher_portal"}, "config-teacher_passwd":{"section":"teacher_portal"}, "config-api_uname":{"section":"api_options"}, "config-api_passwd":{"section":"api_options"}, "config-snapshot_time_seconds":{"section":"snapshot_options"}}';
    window.entry_id = JSON.parse(ids);
    document.write('<!DOCTYPE html><head><link href="/VirtualPass-Webpage/style.css" rel="stylesheet" type="text/css" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>VirtualPass System Editor</title></head>');
    document.write("Configuration options<br>");
    document.write("Admin username: <input type='text' id='config-admin_uname' value='" + window.backArr['config']['administrator_portal']['admin_uname'] + "' ></input><br>");
    document.write("Admin password: <input type='text' id='config-admin_passwd' value='" + window.backArr['config']['administrator_portal']['admin_passwd'] + "' ></input><br><br>");
    document.write("Domain enable: <input type='text' id='config-override_automatic_domain_name' value='" + window.backArr['config']['domain_overrides']['override_automatic_domain_name'] + "' ></input><br><br>");
    document.write("Domain name: <input type='text' id='config-domain_name' value='" + window.backArr['config']['domain_overrides']['domain_name'] + "' ></input><br><br>");
    document.write("Teacher username: <input type='text' id='config-teacher_uname' value='" + window.backArr['config']['teacher_portal']['teacher_uname'] + "' ></input><br>");
    document.write("Teacher password: <input type='text' id='config-teacher_passwd' value='" + window.backArr['config']['teacher_portal']['teacher_passwd'] + "' ></input><br><br>");
    document.write("API username: <input type='text' id='config-api_uname' value='" + window.backArr['config']['api_options']['api_uname'] + "' ></input><br>");
    document.write("API password: <input type='text' id='config-api_passwd' value='" + window.backArr['config']['api_options']['api_passwd'] + "' ></input><br><br>");
    document.write("Snapshot time: <input type='text' id='config-snapshot_time_seconds' value='" + window.backArr['config']['snapshot_options']['snapshot_time_seconds'] + "' ></input><br><br>");
    document.write("Plugins<br>");
    var plugins = ["ck_ver", "com_checkout", "dev_checkout", "teaher_auth"];
    for (pl_name in plugins) {
        document.write(ck_plugin(plugins[pl_name]));
    }
    document.write("<input id='submit' type='button' value='Export file' onclick='exportFile()' ></input>")
    if (typeof window.gets.get('file') !== 'undefined' && window.backArr['config']['domain_overrides']['override_automatic_domain_name'] == 1){
        document.write("<input type='button' value='Apply changes' onclick='location=\"https://" + window.backArr['config']['domain_overrides']['domain_name'] + "/administrator/db_restore.php?data=" + btoa(JSON.stringify(window.backArr)) + "\"' ></input>")
    }
}

function ck_plugin(plugin) {
    if (typeof window.backArr['plugins'][plugin] == 'undefined' || window.backArr['plugins'][plugin] == 0) {
        //make install button
        return plugin + ": <input type='button' id='" + plugin + "' value='install' onclick='togglePlugin(\"" + plugin + "\", 1)' ></input><br>"
    } else {
        return plugin + ": <input type='button' id='" + plugin + "' value='Uninstall' onclick='togglePlugin(\"" + plugin + "\", 0)' ></input><br>"
    }
}
function togglePlugin(plugin, unin) {
    if (typeof window.backArr['plugins'][plugin] == 'undefined' || window.backArr['plugins'][plugin] == 0) {
        document.getElementById(plugin).value = "Uninstall";
        window.backArr['plugins'][plugin] = 1;
    } else {
        document.getElementById(plugin).value = "Install";
        window.backArr['plugins'][plugin] = 0;
    }
}
function exportFile() {
    for (id in window.entry_id) {
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
