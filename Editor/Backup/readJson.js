const readFileAsText = function () {
    const fileToRead = document.getElementById('file-to-read').files[0]
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function (fileLoadedEvent) {

        function ck_plugin(plugin) {
            if (typeof window.backArr['plugins'][plugin] == 'undefined' || window.backArr['plugins'][plugin] == 0) {
                //make install button
                console.log("install " + plugin);
                return plugin + ": <input type='button' id='" + plugin + "' value='install' onclick='togglePlugin(\"" + plugin + "\", 1)' ></input><br>"
            } else {
                console.log("uninstall " + plugin)
                return plugin + ": <input type='button' id='" + plugin + "' value='Uninstall' onclick='togglePlugin(\"" + plugin + "\", 0)' ></input><br>"
            }
        }
        const text = fileLoadedEvent.target.result
        var backJson = atob(text);
        window.backArr = JSON.parse(backJson);
        document.write("Configuration options<br>");
        document.write("Admin username: <input type='text' id='config-admin_uname' value='" + window.backArr['config']['administrator_portal']['admin_uname'] + "' ></input><br>");
        document.write("Admin password: <input type='text' id='config-admin_passwd' value='" + window.backArr['config']['administrator_portal']['admin_passwd'] + "' ></input><br><br>");
        document.write("Domain name: <input type='text' id='config-domain_name' value='" + window.backArr['config']['domain_overrides']['domain_name'] + "' ></input><br><br>");
        document.write("Teacher username: <input type='text' id='config-teach_uname' value='" + window.backArr['config']['teacher_portal']['teacher_uname'] + "' ></input><br>");
        document.write("Teacher password: <input type='text' id='config-teach_passwd' value='" + window.backArr['config']['teacher_portal']['teacher_passwd'] + "' ></input><br><br>");
        document.write("API username: <input type='text' id='config-api_uname' value='" + window.backArr['config']['api_options']['api_uname'] + "' ></input><br>");
        document.write("API password: <input type='text' id='config-api_passwd' value='" + window.backArr['config']['api_options']['api_passwd'] + "' ></input><br><br>");
        document.write("Snapshot time: <input type='text' id='config-admin_uname' value='" + window.backArr['config']['snapshot_options']['snapshot_time_seconds'] + "' ></input><br><br>");
        document.write("Plugins<br>");
        var plugins = ["ck_ver", "com_checkout", "dev_checkout", "teaher_auth"];
        for (pl_name in plugins){
            document.write(ck_plugin(plugins[pl_name]));
        }

    })

    fileReader.readAsText(fileToRead, 'UTF-8')
}
function togglePlugin(plugin, unin) {
    if (typeof window.backArr['plugins'][plugin] == 'undefined' || window.backArr['plugins'][plugin] == 0) {
        document.getElementById(plugin).value = "Uninstall";
        window.backArr['plugins'][plugin] = 1;
        console.log(window.backArr['plugins'][plugin]);
    } else {
        document.getElementById(plugin).value = "Install";
        window.backArr['plugins'][plugin] = 0;
        console.log(window.backArr['plugins'][plugin]);
    }
}
