/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);
  var hash = await sails.bcrypt.hash('123456', salt);

  await User.createEach([
      { username: "admin", password: hash, role:"admin" },
      { username: "tester", password: hash, role:"tester" },
      { username: "visitor", password:hash, role:"visitor"}

      // etc.
  ]);

    if (await Person.count() > 0) {
        return;
    }

    await Person.createEach([
        { name: "Martin Choy", age: 23 },
        { name: "Kenny Cheng", age: 22 }
        // etc.
    ]);

    if (await Qpon.count() > 0) {
        return;
    }

    await Qpon.createEach([
    {"date":"2020/10/01","createdAt":1603279076974,"updatedAt":1603279076974,"id":1,"title":"HK First Restaurant Title","restaurant":"HK First Restaurant","region":"HK Islands","mall":"IFC Mall","image":"https://cdn.asiatatler.com/asiatatler/i/hk/2020/02/12125015-louise-hong-kong-instagrammable-restaurants-2020-hong-kong-tatler_cover_1800x1200.jpg","quota":100,"coins":200,"expiryDate":"","detail":"HK First Restaurant Details","_id":1},
    {"date":"2020/10/02","createdAt":1603279397208,"updatedAt":1603279397208,"id":2,"title":"HK Second Title","restaurant":"HK Second Restaurant","region":"HK Islands","mall":"Pacific Place","image":"https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/06/01180312/HUE-hero-1600x855.jpg","quota":200,"coins":300,"expiryDate":"","detail":"HK Second Detail","_id":2},
    {"date":"2020/10/03","createdAt":1603279567456,"updatedAt":1603279567456,"id":3,"title":"HK Third Restaurant Title","restaurant":"HK Third Restaurant","region":"HK Islands","mall":"Times Square","image":"https://cdn.asiatatler.com/asiatatler/i/hk/2019/12/13094340-hue-daytime_cover_2000x1200.jpg","quota":300,"coins":400,"expiryDate":"","detail":"HK Third Restaurant Detail","_id":3},
    {"date":"2020/10/04","createdAt":1603279724831,"updatedAt":1603279912085,"id":4,"title":"New Territories First Restaurant Title","restaurant":"New Territories First Restaurant","region":"New Territories","mall":"Tsuen Wan Plaza","image":"https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/06/02160123/Harbourside-Grill_Terrace-Evening-View-1024x767.jpg","quota":500,"coins":600,"expiryDate":"","detail":"New Territories First Restaurant Detail","_id":4},
    {"date":"2020/10/05","createdAt":1603279786495,"updatedAt":1603279786495,"id":5,"title":"Kowloon Second Restaurant Title","restaurant":"Kowloon Second Restaurant","region":"Kowloon","mall":"Harbour City","image":"https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/06/01172027/1200skye-outdoor-terrece-161208212630.jpg","quota":600,"coins":700,"expiryDate":"","detail":"Kowloon Second Restaurant Detail","_id":5},
    {"date":"2020/10/06","createdAt":1603279842023,"updatedAt":1603279842023,"id":6,"title":"Kowloon Third Restaurant Title","restaurant":"Kowloon Third Restaurant","region":"Kowloon","mall":"MegaBox","image":"https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/06/01172325/Felix.jpg","quota":800,"coins":900,"expiryDate":"","detail":"Kowloon Third Restaurant Detail","_id":6},
    ]);

    async function generateUsers() {
      const admin = await User.findOne({username: "admin"});
      const tester = await User.findOne({username: "tester"});

    }

    return generateUsers();

};
