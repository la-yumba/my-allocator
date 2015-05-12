var _ = require('lodash');
var API_METHODS = [
  'ARIRulesList',
  'ARIRulesUpdate',
  'ARIUpdate',
  'ARIUpdateStatus',
  'AssociatePropertyToPMS',
  'AssociateUserToPMS',
  'BookingList',
  'BookingPaymentDownload',
  'ChannelList',
  'HelloUser',
  'HelloVendor',
  'HelloVendorUser',
  'HelloWorld',
  'LoopBookingCreate',
  'PropertyChannelList',
  'PropertyList',
  'RoomAvailabilityList',
  'RoomCreate',
  'RoomList',
  'RoomRemove',
  'RoomUpdate',
  'VendorSet'
];

module.exports = function(config, request) {
  request = request || require('request');
  var baseUrl = config.baseUrl || 'https://api.myallocator.com/pms/v201408/json/';
  
  var api = {
    DATE_FORMAT: 'YYYY-MM-DD'
  };

  API_METHODS.forEach(function(method) {
    api[method] = function(requestParams, callback) {
      postRequest(method, requestParams, callback);
    };
  });

  return api;

  function postRequest(method, requestParams, callback) {
    var requestOptions = {
      url: baseUrl + method,
      method: 'POST',
      json: true,
      body: _.merge({}, config.authParams || {}, requestParams)
    };
    
    request.post(requestOptions, function(err, res, body) {
      if (err) return callback(err);
      if (res.statusCode !== 200) 
        return callback(res.statusCode);
      if (!body.Success) 
        return callback(body.Errors);
      
      callback(null, body);
    });
  }
};