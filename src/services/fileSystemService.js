const { log, error } = require('node:console');
const fs = require('fs');
const path = require('node:path');
const { readdir, readFile, mkdir, writeFile, rm } = require('node:fs/promises');
const { randomUUID } = require('node:crypto');

const createDirectoryIfNotExist = async (directory) => {
	if (!fs.existsSync(directory)) {
		try {
			await mkdir(directory);
			log('Created documents directory');
		} catch (err) {
			error(err);
		}
	}
};

const handleGetAllDocuments = async (userDataPath) => {
	const documentsFolderName = 'App Documents';
	const directory = path.join(userDataPath, documentsFolderName);

	await createDirectoryIfNotExist(directory);

	const documents = [];

	try {
		const filenames = await readdir(directory);

		for (let filename of filenames) {
			if (!filename.includes('.json')) continue;

			documents.push(
				await readFile(path.join(directory, filename), {
					encoding: 'utf-8',
				}).then((content) => JSON.parse(content))
			);
		}
	} catch (err) {
		error(err);
	}

	await Promise.all(documents);

	const documentsMap = {};
	documents.forEach((document) => {
		documentsMap[document.id] = document;
	});

	return documentsMap;
};

const handleAddNewDocument = async (userDataPath) => {
	const documentsFolderName = 'App Documents';
	const directory = path.join(userDataPath, documentsFolderName);

	const newDocument = {
		id: randomUUID(),
		created: new Date(),
		elements: [
			{
				id: randomUUID(),
				type: 'documentTitle',
				content: '',
			},
			{
				id: randomUUID(),
				type: 'p',
				content: '',
			},
		],
	};

	try {
		const promise = writeFile(
			path.join(directory, `${newDocument.id}.json`),
			JSON.stringify(newDocument)
		);

		await promise;

		const createdDocument = await readFile(
			path.join(directory, `${newDocument.id}.json`),
			{
				encoding: 'utf-8',
			}
		).then((content) => JSON.parse(content));

		return createdDocument;
	} catch (err) {
		error(err);
	}
};

const handleUpdateDocument = async (document, userDataPath) => {
	const documentsFolderName = 'App Documents';
	const directory = path.join(userDataPath, documentsFolderName);

	try {
		const promise = writeFile(
			path.join(directory, `${document.id}.json`),
			JSON.stringify(document)
		);

		await promise;
	} catch (err) {
		error(err);
	}

	return document;
};

const handleDeleteDocument = async (id, userDataPath) => {
	const documentsFolderName = 'App Documents';
	const directory = path.join(userDataPath, documentsFolderName);

	try {
		const promise = rm(path.join(directory, `${id}.json`));

		await promise;
	} catch (err) {
		error(err);
	}
};

module.exports = {
	handleAddNewDocument,
	handleGetAllDocuments,
	handleUpdateDocument,
	handleDeleteDocument,
};
