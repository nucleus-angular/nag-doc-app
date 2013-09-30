var ObjectArray = {};

(function(ObjectArray){
	ObjectArray.getObjectByPropertyValue = function(data, key, value) {
		for(var prop in data) {
			if(data.hasOwnProperty(prop)) {
				if(data[prop][key] === value) {
					return data[prop];
				}
			}
		}
	}

	ObjectArray.getKeyByPropertyValue = function(data, key, value) {
		for(var x = 0; x < data.length; x+= 1) {
			if(data[x][key] == value) {
				return x;
			}
		}

		return -1;
	}
}(ObjectArray));
