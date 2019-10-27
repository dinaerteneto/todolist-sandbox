const stores = ['react-to-do-list'];
const version = 2;
const dbName = 'todolist';
let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Não pode ser instanciada');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            }
            openRequest.onsuccess = e => {
                if(!connection) {
                    connection = e.target.result;
                    close = connection.close;
                    connection.close = function() {
                        throw new Error('Não é possível fechar diretamente a conexão.');
                    }
                }
                resolve(connection);
            }
            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            }
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {
        if(connection){
            Reflect.apply(close, connection, [])
            connection = null;
        }
    }
}