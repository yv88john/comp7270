/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {

    if (req.method == "GET") return res.view('person/create');
    
    var person = await Person.create(req.body).fetch();

    return res.status(201).json({ id: person.id });
},

};

