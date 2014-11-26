var Firebase, FirebaseCollection, Spine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Spine = this.Spine || require('spine');

Firebase = this.Firebase || require('firebase');

FirebaseCollection = (function() {
  function FirebaseCollection(model) {
    var collection, firebaseRef;
    this.model = model;
    this._setLocal = __bind(this._setLocal, this);
    collection = this.model.className.toLowerCase() + 's';
    if (typeof this.model.url === 'function') {
      firebaseRef = [this.model.url(), collection].join('/');
    } else {
      firebaseRef = [this.model.url, collection].join('/');
    }
    this.firebase = new Firebase(firebaseRef);
    this.firebase.on('value', this._setLocal);
  }

  FirebaseCollection.prototype._setLocal = function(snapshot) {
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

  return FirebaseCollection;

})();

Spine.Model.Firebase = {
  extended: function() {
    return this.fetch(this.firebaseFetch);
  },
  firebaseFetch: function() {
    return new FirebaseCollection(this);
  }
};
