'use strict';

angular.module('app')
	.filter('capitalize', function() {
    	return function(input, all) {
    		void(all);
            if (!isString(input)){
                return input;
            }
    		if(input.length < 4 && input!='NaN'){
    			return input + '';
    		}else{
    			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    		}
    	}
	});

function isString(o) {
        return (Object.prototype.toString.call(o) === '[object String]');
    }
