import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS todo_list (id INTEGER PRIMARY KEY AUTOINCREMENT, heading TEXT, message TEXT);'
        );
    });
};

const insertItem = (itemData, callback) => {
    const { header, message } = itemData;

    db.transaction(tx => {
        tx.executeSql('INSERT INTO todo_list (heading, message) VALUES (?,?);', [header, message], (_, result) => {
            callback(result.insertId);
        });
    });
};

const deleteItem = (itemId, callback) => {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM todo_list WHERE id = ?;', [itemId], (_, result) => {
            callback(result.rowsAffected);
        });
    });
};

const getAllItems = (callback) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM todo_list;', [], (_, result) => {
            callback(result.rows._array);
            const items = result.rows._array;
            console.log('Current items in the database:', items);
        });
    });
};

const recreateTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE IF EXISTS items;',
            [],
            // () => {
            //     // Table dropped successfully (or didn't exist)
            //     tx.executeSql(
            //         'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
            //         [],
            //         () => {
            //             // Table created successfully
            //             console.log('Table recreated successfully');
            //         },
            //         (_, error) => {
            //             // Error creating the table
            //             console.error('Error creating table:', error);
            //         }
            //     );
            // },
            (_, error) => {
                // Error dropping the table
                console.error('Error dropping table:', error);
            }
        );
    });
};


export { createTable, insertItem, getAllItems, deleteItem, recreateTable };