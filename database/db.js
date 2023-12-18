import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
        );
    });
};

const insertItem = (name, callback) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO items (name) VALUES (?);', [name], (_, result) => {
            callback(result.insertId);
        });
    });
};

const deleteItem = (itemId, callback) => {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM items WHERE id = ?;', [itemId], (_, result) => {
            callback(result.rowsAffected);
        });
    });
};

const getAllItems = (callback) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM items;', [], (_, result) => {
            callback(result.rows._array);
        });
    });
};

export { createTable, insertItem, getAllItems, deleteItem };