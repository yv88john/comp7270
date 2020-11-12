
/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    search: async function (req, res) {

      let whereClause = {};

      const limit = Math.max(req.query.limit, 2) || 2;
      const offset = Math.max(req.query.offset, 0) || 0;


      if(req.query.region) {
        if(req.query.region != "Not Specified") {
          whereClause.region = req.query.region;
        }
      }
      if(req.query.min_coin) {
       whereClause.coins = {">=" : parseInt(req.query.min_coin)};
      }

      if(req.query.max_coin) {
        whereClause.coins = {"<=" : parseInt(req.query.max_coin)};
      }

      if(req.query.valid_on) {
        whereClause.valid_on = req.query.valid_on;
      }


      let thoseQpons = await Qpon.find({where:whereClause,limit:limit,skip:offset});

      let count  = thoseQpons.length;

      return res.view('qpon/search', { qpons: thoseQpons ,numOfRecords: count});
  },

    read: async function (req, res) {

      let showRedeemBtn = async function (qponId,userName) {
        sails.log("Qpon ID : [" + qponId +"]");
        var user = await User.findOne({username:userName}).populate("qpons");
        sails.log(JSON.stringify(user));
        var userRole = user.role;
        if(userRole=="member" || userRole=="admin") {
            sails.log("User Qpons");
            sails.log(user.qpons);
            if(user.qpons.length > 0) {
              var qponIdArray = user.qpons.map( x=> x.id);
              sails.log("qponIdArray : " + qponIdArray);
              sails.log("qponId :" +qponId);
              if(qponIdArray.includes(qponId)) {
                sails.log("false");
                return false;
              } else {
                sails.log("true");
                return true;
                
              }
            } else {
              return true;
            }
        } else {
          return false;
        }
      };

      let thatQpon = await Qpon.findOne(req.params.id);

      if (!thatQpon) return res.notFound();

      let showRedeemQpon = false;

      if(req.session.username) {
        showRedeemQpon = await showRedeemBtn(thatQpon.id,req.session.username);
        //showRedeemQpon = await sails.helpers.showRedeemBtn(thatQpon.id,req.session.username);
      }

      return res.view('qpon/detail', { qpon: thatQpon, showRedeemQpon: showRedeemQpon});

    },

    main: async function (req, res) {

      let qpons = await Qpon.find();

      return res.view('qpon/homepage', {qpons:qpons});
    },

    list: async function (req, res) {

        let qpons = await Qpon.find();

        return res.view('qpon/list', { qpons: qpons });
    },

    create: async function (req, res) {

      if (req.method == "GET") return res.view('qpon/create');

      let qpon = await Qpon.create(req.body).fetch();

      return res.status(201).json({ id: qpon.id });
    },


    update: async function (req, res) {

      if (req.method == "GET") {

          let thatQpon = await Qpon.findOne(req.params.id);

          if (!thatQpon) return res.notFound();

          return res.view('qpon/update', { qpon: thatQpon });

      } else {

          let updatedQpon = await Qpon.updateOne(req.params.id).set(req.body);

          if (!updatedQpon) return res.notFound();

          return res.ok();
      }
  },

    delete: async function (req, res) {

        let deletedQpon = await Qpon.destroyOne(req.params.id);

        if (!deletedQpon) return res.notFound();

        return res.ok();
    },


  }

