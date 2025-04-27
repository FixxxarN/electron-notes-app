const { app, BrowserWindow, ipcMain } = require('electron');
const { log } = require('node:console');
const {
	handleGetAllDocuments,
	handleAddNewDocument,
	handleDeleteDocument,
	handleUpdateDocument,
} = require('./services/fileSystemService');

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

const userDataPath = app.getPath('userData');
log(userDataPath);

ipcMain.handle('addNewDocument', () => handleAddNewDocument(userDataPath));
ipcMain.handle('getAllDocuments', () => handleGetAllDocuments(userDataPath));
ipcMain.handle('updateDocument', (_, ...args) =>
	handleUpdateDocument(...args, userDataPath)
);
ipcMain.handle('deleteDocument', (_, ...args) =>
	handleDeleteDocument(...args, userDataPath)
);
