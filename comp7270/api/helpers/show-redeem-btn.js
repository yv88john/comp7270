module.exports = {


  friendlyName: 'Show Redeem Btn',


  description: 'Return Boolean for show Redeem Btn.',


  inputs: {

    qponId: {
      type: 'string',
      example: 'id',
      description: 'The id of the qpon',
      required: true
    },
    userName: {
      type: 'string',
      required:true
    }

  },




  fn: async function (inputs, exits) {

    var showRedeemBtn = async function (qponId,userName) {
      sails.log("Qpon ID : [" + qponId +"]");
      var user = await User.findOne({username:userName}).populate("qpons");
      var userRole = user.role;
      if(userRole=="member" || userRole=="admin") {
          sails.log("User Qpons");
          sails.log(user.qpons);
          if(user.qpons.length > 0) {
            var qponIdArray = user.qpons.map( x=> x.id);
            if(qponIdArray.includes(qponId)) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
      } else {
        return false;
      }
    };

    var result = await showRedeemBtn(inputs.qponId,inputs.userName);
    return exits.success(result);
  },


};

