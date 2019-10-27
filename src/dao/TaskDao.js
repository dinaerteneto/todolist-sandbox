import {Task} from '../models/Task';

export class TaskDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'react-to-do-list';
    }

    add(task) 
    {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(task, task.id);
            
            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                reject('Não foi possível adicionar a tarefa');
            };
        });
    }

    upd(task) {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .openCursor();
            
            cursor.onsuccess = e => {
                let current = e.target.result;
                if(current) {
                    if(current.value._id === task._id) {
                        const request = current.update(task);
                        request.onsuccess = e => {
                            resolve();
                        };        
                        request.onerror = e => {
                            reject('Não foi possível alterar a tarefa');
                        };                       
                    }
                   current.continue();
                } else {
                   resolve();
                }
            }

        });
    }

    del(task) {
        return new Promise((resolve, reject) => {
            let request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .delete(task.id);

            request.onsuccess = (e) => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a tarefa');
            };
        })

    }

    all() {
        return new Promise((resolve, reject) => {
            let tasks = [];
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual) {
                    let dado = atual.value;
                    tasks.push(new Task(dado._id, dado._done, dado._name));
                    atual.continue();
                } else {
                   resolve(tasks);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as tasks');
            };

        })        
    }

}