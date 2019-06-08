/*
var memory = new JSONMemory("key");
memory.logEnabled = false;
memory.Init({
	profiles: {},
	options: {}
});
...
memory.data.profiles["user"].x += 5;
memory.Save();
*/

JSONMemory = function(localStorageKey) {
	var THIS = this;

	var localStorageKey = localStorageKey; // string to select local storage

	this.data = null; // holds runtime data linked to storaged data
	this.defaultData;
	this.logEnabled = false;

	this.Load = function() {
		try {
			this.Log("Loading..");
			var strData = localStorage.getItem(localStorageKey);
			this.Log("Loading String Data: " + strData);
			if (strData == null) { // first time playing
				this.Log("Could not load. String is null.");
				return false;
			} else if (strData == "") {
				this.Log("Could not load. String is empty.");
				return false;
			} else {
				this.Log("Loading Successfull.");
				this.data = JSON.parse(strData);
				return true;
			}
		} catch(e) {
			return false;
		}
	}
	this.Save = function() {
		try {
			var strData = JSON.stringify(this.data);
			localStorage.setItem(localStorageKey, strData);
			return true;
		} catch(e) {
			return false;
		}
	}

	this.Init = function(defaultData) {
		this.Log("Initializing with defaultData:");
		this.Log(defaultData);
		this.data = null;
		this.defaultData = defaultData;
		this.Log("Initial Load()");
		if (this.Load()) {
			this.Log("Inited Successfully.");
			return true;
		} else {
			this.Log("Loading False. Trying to reset memory");
			this.Reset();
			return false; // you should warn users that data is reseted
		}
	}

	this.Purge = function() {
		this.Log("Purging..");
		this.data = null;
		delete localStorage[localStorageKey];
		this.Log("Purged Ended.");
	}

	// resets everything, even local storage, to defaultData
	this.Reset = function() {
		this.Log("Resetting..");
		this.Purge();
		this.Log("Reconstructing memory.");
		var strData = JSON.stringify(this.defaultData);
		localStorage.setItem(localStorageKey, strData);
		this.data = JSON.parse(JSON.stringify(this.defaultData));
	}

	this.Log = function(str) {
		if (this.logEnabled) {console.log("JSONMemory: " , str);}
	}

	this.Report = function() {
		console.log("JSONMemory Report:");
		console.log("\tLocal: ", localStorage[localStorageKey]);
		console.log("\tDefault Data: ", THIS.defaultData);
		console.log("\tRuntime Data: ", THIS.data);
	}
}







