var _ = require('lodash');
var DEFAULT_BASE_URL = 'https://api.myallocator.com/pms/v201408/json/';
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
  var baseUrl = config && config.baseUrl || DEFAULT_BASE_URL;
  var authParams = config && config.authParams || {};
  
  request = request || require('request');
  
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
      body: _.merge({}, authParams, requestParams)
    };
    
    request.post(requestOptions, function(err, res, body) {
      if (err) return callback(err);
      if (res.statusCode !== 200) 
        return callback(res.statusCode);
      if (body.Errors) 
        return callback(body.Errors);
      
      callback(null, body);
    });
  }
};