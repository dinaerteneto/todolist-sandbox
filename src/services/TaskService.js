import { ConnectionFactory } from "./ConnectionFactory";
import { TaskDao } from "../dao/TaskDao";

export class TaskService {

    create(task) {
        console.log(task);
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDao(connection))
            .then(dao => dao.add(task))
            .then(() => 'Task adicionada com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a task');
            });
    }

    update(task) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDao(connection))
            .then(dao => dao.upd(task))
            .then(() => 'Task alterada com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível alterar a task');
            });
    }

    delete(task) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDao(connection))
            .then(dao => dao.del(task))
            .then(() => 'Task removida com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível remover a task')
            });
    }

    all() {
        return ConnectionFactory
        .getConnection()
        .then(connection => new TaskDao(connection))
        .then(dao => dao.all())
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível alterar a task');
        });       
    }



}