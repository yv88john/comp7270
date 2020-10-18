module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'GET /qpon/create': 'QponController.create',
  'POST /qpon/create': 'QponController.create',
  'GET /qpon/update/:id':'QponController.update',
  'POST /qpon/update/:id':'QponController.update',
  'GET /qpon/delete/:id': 'QponController.delete',
  'GET /qpon/list': 'QponController.list',
};
