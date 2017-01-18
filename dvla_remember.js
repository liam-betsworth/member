var remember = (function() {  

  return {
    /**
* @param {String} name The name of the property to set
* @param {Object} value The value to use when setting the specified property
* @param {int} [days] The number of days until the storage of this item expires (if storage of the provided item must fallback to using cookies)
*/
    set: function(name, value) {
      if (value instanceof Object) value = JSON.stringify(value);
      
      localStorage.setItem(name, value);
    },

    /**
* @param {String} name The name of the value to retrieve
* @return {?Object} The stored value
*/
    get: function(name) {
      var value = localStorage.getItem(name);
      
      try {
        value = JSON.parse(value);
        return value;
      } catch(e) {
        return value;
      }
    },
    
    setup: function() {
      var x = {}
      for (prop in localStorage) {
        let value = '';
        
        try {
          value = JSON.parse(localStorage[prop]);
        } catch (err) {
          value = localStorage[prop];
        }
        
        x[prop] = value;
        //remember.set(prop, localStorage[prop]);
      }
      
      x.clear = function() {
        localStorage.clear();
        member = new Proxy(remember.setup(), remember.validator);
        return true;
      };
      
      return x;
    },
    
    clear: function() {
      localStorage.clear(); 
    },
    
    validator: {
      get: function(target, key) {

        if (!(key in target)) {
          if (remember.get(key) !== null) {
            target[key] = remember.get(key);
            if (typeof target[key] === 'object' && target[key] !== null) {
              return new Proxy(target[key], remember.validator)
            } else {
              return target[key];
            }
          } else {
            return undefined; 
          }
        }

        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], remember.validator)
        } else {
          return target[key];
        }
      },
      set: function(target, name, value) {
        target[name] = value;
        // TODO: Need mass conversion of member instead of single value
        remember.clear();

        for (prop in member) {
          remember.set(prop, member[prop]);
        }

        return true;
      },
      deleteProperty: function(target, prop) {
        delete target[prop];
        // TODO: Reculculate local storage
        remember.clear();

        for (prop in member) {
          remember.set(prop, member[prop]);
        }

        return true;
      }
    }
    
  };
})();

var member = new Proxy(remember.setup(), remember.validator);