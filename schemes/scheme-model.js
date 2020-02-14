const db = require('../data/db-config.js')

module.exports = {
    find, //working
    findById, //working
    findSteps, //working
    add, //working
    update, //working
    remove
}

function find(){ //working
    return db('Schemes')
}

function findById(id){ //working
    return db('Schemes')
    .where({id})
    .first()    
}

function findSteps(id) { //working
    return db("steps")
    .join("Schemes", "Schemes.id", "steps.scheme_id")
    .select("steps.id", "Schemes.scheme_name", "steps.instructions")
    .where({ scheme_id: id });
}
 
// function add(scheme){
//     return db("Schemes")
//     .insert(scheme, 'id')
//     .then(count => {
//         count > 0 ? this.get(id) : null
//     })
// }

function add(schemeData) {
    return db("Schemes")
    .insert(schemeData);
}

function update(changes, id){
    return db("Schemes")
    .where({id})
    .update(changes);
}

function remove(id){
    return db('Schemes')
    .where({id})
    .del();
}