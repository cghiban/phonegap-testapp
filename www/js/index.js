/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('getLocation').addEventListener('click', this.getLocation, false);
        document.getElementById('getPhoto').addEventListener('click', this.getPhotoCamera, false);
        document.getElementById('getPhotoLib').addEventListener('click', this.getPhotoLibrary, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var info = document.getElementById('info');
        info.innerHTML = 'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />';
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getLocation: function() {
        navigator.geolocation.getCurrentPosition(
            //onSuccess, 
            function(pos) {

                console.info('success');
                console.info(pos.coords.latitude);
                console.info(pos.coords.longitude);

                alert('Latitude: '          + pos.coords.latitude          + '\n' +
                      'Longitude: '         + pos.coords.longitude         + '\n' +
                      'Altitude: '          + pos.coords.altitude          + '\n' +
                      'Accuracy: '          + pos.coords.accuracy          + '\n' +
                      'Altitude Accuracy: ' + pos.coords.altitudeAccuracy  + '\n' +
                      'Heading: '           + pos.coords.heading           + '\n' +
                      'Speed: '             + pos.coords.speed             + '\n' +
                      'Timestamp: '         + pos.timestamp                + '\n'
                );
                document.getElementById("info_lat").innerHTML = pos.coords.latitude;
                document.getElementById("info_lon").innerHTML = pos.coords.longitude;
                document.getElementById("info_alt").innerHTML = pos.coords.altitude;
            },
            //onError
            function(error) {
                console.info('error');
                var msg = 'code: '  + error.code    + '\n' +
                          'message: ' + error.message + '\n';
                console.info(error);
                alert( msg );
            },
            // options
            {maximumAge: 15000, timeout: 15000, enableHighAccuracy: true }

        );
    },

    scan: function() {
        console.log('scanning');
        
        //var scanner = cordova.require("phonegap/plugin/BarcodeScanner");
        //var scanner = cordova.require("cordova/plugin/phonegap-plugin-barcodescanner");
        cordova.plugins.barcodeScanner.scan( function (result) {

            alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) {
            console.log("Scanning failed: ", error);
        });
    },
    getPhotoCamera: function() {
        navigator.camera.getPicture(
            // onsuccess
            function onSuccess(imageData) {
                var imgholder = document.getElementById('imgholder');
                var img = document.createElement("img");
                img.style.maxWidth = '200px';
                img.style.display = 'block';
                img.src = "data:image/jpeg;base64," + imageData;
                imgholder.appendChild(img);
            },

            function onFail(message) {
                alert('Failed because: ' + message);
            },
            { // options
                quality: 20,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true,
                correctOrientation: true
                //saveToPhotoAlbum: true
            }
            // Camera.DestinationType.FILE_URI
        );
    },
    getPhotoLibrary: function() {
        navigator.camera.getPicture(
            // onsuccess
            function onSuccess(imageURI) {
                var imgholder = document.getElementById('imgholder');
                var img = document.createElement("img");
                img.style.display = 'block';
                img.style.maxWidth = '200px';
                img.src = imageURI;
                console.info(imageURI);
                imgholder.appendChild(img);
            },

            function onFail(message) {
                alert('Failed because: ' + message);
            },
            { // options
                quality: 20,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true
                //correctOrientation: true,
                //saveToPhotoAlbum: true
            }
            // Camera.DestinationType.FILE_URI
        );
    }

    /*encode: function() {
        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
    }*/

};
