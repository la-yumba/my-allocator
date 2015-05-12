const assert = require("assert");

describe('myAllocator', function () {
  describe('.postRequest', function () {
  
    it('posts a request with the expected parameters', function() {
      var called = false;
    
      const testData = {
        'StartDate': '2015-10-09', 
        'EndDate': '2015-10-09'
      };
      
      const fakeRequest = { 
        post: function (options, callback) { 
          called = true;
          assert.equal(options.method, 'POST');
          assert.equal(options.body.StartDate, testData.StartDate);
          assert.equal(options.json, true);
          callback(null, {statusCode: 200}, {Success: true});
        } 
      };
      
      const myAllocator = require("../index")({}, fakeRequest);
  
      myAllocator.RoomAvailabilityList(testData, function(err, result) { 
        assert(!err); 
        assert(result.Success);
      });
        
      assert(called);
    });
  });
});
