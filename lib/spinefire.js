var Collection, Extend, Firebase, Include, Singleton, Spine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Spine = this.Spine || require('spine');

Firebase = this.Firebase || require('firebase');

Collection = (function() {
  function Collection(model) {
    this.model = model;
    this._setLocal = __bind(this._setLocal, this);
  }

  Collection.prototype._setLocal = function(snapshot) {
    var id, records, _i, _len, _ref;
    snapshot = snapshot.val();
    records = [];
    _ref = Object.keys(snapshot);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      snapshot[id].id = id;
      records.push(snapshot[id]);
    }
    return this.model.refresh(records);
  };

  return Collection;

})();

Singleton = (function() {
  function Singleton(record) {
    this.record = record;
    this.model = this.record.constructor;
  }

  Singleton.prototype.reload = function() {};

  Singleton.prototype.create = function() {};

  Singleton.prototype.update = function(options) {
    return this.model.firebase.child(this.record.id).update({
      todo: this.record.todo
    });
  };

  Singleton.prototype.destroy = function() {};

  return Singleton;

})();

Extend = {
  collection: function() {
    return new Collection(this);
  },
  generateFirebaseRef: function() {
    var collection;
    collection = this.className.toLowerCase() + 's';
    if (typeof this.url === 'function') {
      return [this.url(), collection].join('/');
    } else {
      return [this.url, collection].join('/');
    }
  }
};

Include = {
  singleton: function() {
    return new Singleton(this);
  }
};

Spine.Model.Firebase = {
  extended: function() {
    this.fetch(this.firebaseFetch);
    this.change(this.firebaseChange);
    this.extend(Extend);
    return this.include(Include);
  },
  firebaseFetch: function() {
    var coll;
    coll = this.collection();
    if (this.firebase == null) {
      this.firebase = new Firebase(this.generateFirebaseRef());
      return this.firebase.on('value', coll._setLocal);
    }
  },
  firebaseChange: function(record, type, options) {
    var _base;
    if (options == null) {
      options = {};
    }
    return typeof (_base = record.singleton())[type] === "function" ? _base[type](options) : void 0;
  }
};
