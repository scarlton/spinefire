var Posts, Spine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Spine = require('spine');

require('../spinefire');

Posts = (function(_super) {
  __extends(Posts, _super);

  function Posts() {
    return Posts.__super__.constructor.apply(this, arguments);
  }

  Posts.configure('Post', 'todo');

  Posts.extend(Spine.Model.Firebase);

  Posts.url = 'https://brilliant-inferno-3418.firebaseio.com';

  return Posts;

})(Spine.Model);

Posts.bind('refresh', function() {
  return Posts.first().updateAttribute('todo', 'test123');
});

Posts.fetch();
