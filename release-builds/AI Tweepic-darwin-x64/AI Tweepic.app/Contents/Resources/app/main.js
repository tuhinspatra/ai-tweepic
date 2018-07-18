process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const {app, BrowserWindow} = require('electron')

let mainWindow, openwindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        width: 1120,
        height: 700, 
        webPreferences: {
            nodeIntegration: true,
        },
        show: false,
    });
    mainWindow.loadFile('index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    // mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {

    });
    mainWindow.on('active', function () {
        if (mainWindow == null) {
            createWindow();
        }
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('active', function () {
    if (mainWindow == null) {
        createWindow();
    }
});


/* ipcMain.on('open-window', function(event, x, y) {
    mainWindow.setSize(x, y)
    openwindow = new BrowserWindow({modal: true, parent: mainWindow, width: 400, height: 400, backgroundColor: '#431233'});
    openwindow.show()
}) */



