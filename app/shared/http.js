/**
 * This is the customized version of durandal http.js
 * We config the 'paths' to tell require.js to load this file instead.
**/
/**
 * Durandal 2.0.0 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */
/**
 * Enables common http request scenarios.
 * @module http
 * @requires jquery
 * @requires knockout
 */
define(['jquery', 'knockout', 'toastr'], function ($, ko, toastr) {
    function ajax(method, url, data, options) {
        var parameters = method === 'GET' ? data : ko.toJSON(data);
        var o = {
            url: url,
            data: parameters,
            type: method,
            contentType: 'application/json',
            dataType: 'json',
            traditional: 'true',
            error: function(response) {
                if (response.status === 400) {
                    var error = response.responseJSON;
                    var message = error.message;
                    if ('detail' in error) {
                        var p = $('<div></div>');
                        if ($.isArray(error.detail)) {
                            $.each(error.detail, function (index, item) {
                                p.append($('<span class="label label-default"></span>').text(item)).append('&nbsp;');
                            });
                        } else {
                            p.text(error.detail);
                        }

                        message += p[0].outerHTML;
                    }
                    toastr[response.responseJSON.level](message);
                }
            }
        };
        if (options) {
            $.extend(o, options);
        }
        return $.ajax(o);
    }
    /**
     * @class HTTPModule
     * @static
     */
    return {
        /**
         * The name of the callback parameter to inject into jsonp requests by default.
         * @property {string} callbackParam
         * @default callback
         */
        callbackParam:'callback',
        /**
         * Makes an HTTP GET request.
         * @method get
         * @param {string} url The url to send the get request to.
         * @param {object} [query] An optional key/value object to transform into query string parameters.
         * @return {Promise} A promise of the get response data.
         */
        get:function(url, query) {
            return ajax('GET', url, query);
        },
        /**
         * Makes an JSONP request.
         * @method jsonp
         * @param {string} url The url to send the get request to.
         * @param {object} [query] An optional key/value object to transform into query string parameters.
         * @param {string} [callbackParam] The name of the callback parameter the api expects (overrides the default callbackParam).
         * @return {Promise} A promise of the response data.
         */
        jsonp: function (url, query, callbackParam) {
            if (url.indexOf('=?') == -1) {
                callbackParam = callbackParam || this.callbackParam;

                if (url.indexOf('?') == -1) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += callbackParam + '=?';
            }

            return $.ajax({
                url: url,
                dataType:'jsonp',
                data:query
            });
        },
        /**
         * Makes an HTTP POST request.
         * @method post
         * @param {string} url The url to send the post request to.
         * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
         * @return {Promise} A promise of the response data.
         */
        post: function (url, data, options) {
            return ajax('POST', url, data, options);
        },
        put: function (url, data, options) {
            return ajax('PUT', url, data, options);
        },
        del: function (url) {
            return ajax('DELETE', url);
        }
    };
});
