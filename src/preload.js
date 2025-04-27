const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileSystem', {
	addNewDocument: async () => await ipcRenderer.invoke('addNewDocument'),
	getAllDocuments: async () => await ipcRenderer.invoke('getAllDocuments'),
	updateDocument: async (document) =>
		await ipcRenderer.invoke('updateDocument', document),
	deleteDocument: async (id) => await ipcRenderer.invoke('deleteDocument', id),
});
