const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the SQLite3 database.');
    }
});

const getAllTasks = function () {
    return new Promise(function(resolve,reject){
        db.serialize(() => {
            db.all(`SELECT * FROM todolist ORDER BY type ASC`, [], (err, rows) => {
                if (err) {
                    console.error(err);
                    reject('error');
                }
                else {
                    console.log('Query successfully completed.(getAllTasks)');
                    resolve(rows);
                }
            });
        });
    });
};
exports.getAllTasks = getAllTasks;

const insertTask = function (value) {
    console.log("Inserting..");
    return new Promise(function(resolve,reject){
        db.serialize(() => {
            db.run(`INSERT INTO todolist(todoitem) VALUES(?)`, [value], function (err) {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    console.log('Query successfully completed.(insertTask)');
                    resolve({ lastRowID: this.lastID });
                }
            });
        });
    });
};
exports.insertTask = insertTask;

const deleteTask = function (id) {
    return new Promise(function(resolve,reject){
        db.run(`DELETE FROM todolist WHERE id=?`, id, function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            else {
                console.log('Query successfully completed.(deleteTask)');
                resolve(this.changes);
            }
        });
    });
};
exports.deleteTask = deleteTask;

const updateTask = function (id, bool) {
    return new Promise(function(resolve,reject){
        db.run(`UPDATE 'todolist' SET type=? WHERE id=?`, [bool, id], function (err) {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log(`Row(s) updated: ${this.changes}`);
                resolve(this.changes);
            }
        });
    });
};
exports.updateTask = updateTask;
