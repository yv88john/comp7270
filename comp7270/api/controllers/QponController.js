/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async function (req, res) {

      var qpons = await Qpon.find();

      return res.view('qpon/list', { qpons: qpons });
  },

  create: async function (req, res) {

    if (req.method == "GET") return res.view('qpon/create');

    var qpon = await Qpon.create(req.body).fetch();

    return res.status(201).json({ id: qpon.id });
  },


  update: async function (req, res) {

    if (req.method == "GET") {

        var thatQpon = await Qpon.findOne(req.params.id);

        if (!thatQpon) return res.notFound();

        return res.view('qpon/update', { qpon: thatQpon });

    } else {

        var updatedQpon = await Qpon.updateOne(req.params.id).set(req.body);

        if (!updatedQpon) return res.notFound();

        return res.ok();
    }
},

  delete: async function (req, res) {

      var deletedQpon = await Qpon.destroyOne(req.params.id);

      if (!deletedQpon) return res.notFound();

      return res.ok();
  },
};

