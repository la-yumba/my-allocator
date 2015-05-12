# my-allocator
Easily access the MyAllocator API from node. 
The API is documented [here](myallocator.github.io/apidocs/)

## Basic Usage

```
var myAllocator = require('my-allocator')();

myAllocator.HelloWorld({ hello: 'world' }, function(err, result) {
  console.log(result);
});
```

## Typical Usage

### 1. Initialize myAllocator

```
var options = {
  "baseUrl": "https://api.myallocator.com/pms/v201408/json/",
  "authParams": {
    "Auth/VendorId": "my-vendor-id",
    "Auth/VendorPassword": "shhh",
    "Auth/PropertyId": "12345",
    "Auth/UserId": "my-user-id",
    "Auth/UserPassword": "verysecret"
  }
};

var myAllocator = require('my-allocator')(options);
```

The following options are available when you initialize.

* **baseUrl** if not provided, defaults to ```https://api.myallocator.com/pms/v201408/json/```
* **authParams** authentication parameters that will be passed with every subsequent request (but can be overridden)

### 2. Consume the API

Your myAllocator object now exposes all API methods defined in the [API](myallocator.github.io/apidocs/)
which can be called in the usual form ```myAllocator.MethodName(requestParams, callback)``` - for example:

```
var requestParams = {
  'StartDate': '2015-10-09', 
  'EndDate': '2015-10-09'
};

myAllocator.RoomAvailabilityList(requestParams, function(err, result) {
  console.log(err, result);
});
```

Note that you ```requestParams``` object will be enriched with the ```authParams``` you 
passed in at initialization (you can override any of these by explicitely 
passing in a different value in your requestParams, for example if you manage
multiple properties).

## Run the tests

```npm test```
