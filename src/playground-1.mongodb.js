/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

import { ObjectId } from "mongodb";

// Select the database to use.
use('sample_mflix');

db.getCollection("users").find({});

db.characters.updateOne({ name: 'Obi-Wan Kenoby' }, { $set: { name: 'Obi-Wan Kenobi' } })
db.characters.find({ mana: { $gt: 30 } }) //greater than
db.characters.find({}, { name: 1, _id: 0 }) //segundo param, los attr a mostrar

db.characters.find({ _id: ObjectId('662ff84ed6d76f2e2846b799') });
