var remember = (function() {  

  return {
    /**
* @param {String} name The name of the property to set
* @param {Object} value The value to use when setting the specified property
*/
    set: function(name, value) {
      if (value instanceof Object) {
          value = JSON.stringify(value);
      }

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
      var x = {};
      
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
      get: function(target, key, receiver) {

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
        if (value instanceof Date) {
          console.warn('Date was automatically converted to a String – Date is incompatible with member.js');
          target[name] = value.toString();
        } else if (value.hasOwnProperty('_isAMomentObject')) {
          console.warn('Date was automatically converted to a String – Moment is incompatible with member.js');
          target[name] = value.toString();
        } else if (value instanceof Map) {
          throw new TypeError('Map is incompatible with member.js');
        } else if (value instanceof WeakMap) {
          throw new TypeError('WeakMap is incompatible with member.js');
        } else if (value instanceof Set) {
          throw new TypeError('Set is incompatible with member.js');
        } else if (value instanceof WeakSet) {
          throw new TypeError('WeakSet is incompatible with member.js');
          return undefined;
        } else if (value instanceof Number) {
          throw new TypeError('Number is incompatible with member.js');
          return undefined;
        } else if (value instanceof RegExp) {
          throw new TypeError('RegExp is incompatible with member.js');
          return undefined;
        } else {
          target[name] = value;
        }

        remember.clear();

        for (prop in member) {
          remember.set(prop, member[prop]);
        }

        return target[name];
      },
      deleteProperty: function(target, prop) {
        delete target[prop];

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