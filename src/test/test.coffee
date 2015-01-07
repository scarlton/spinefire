Spine = require('spine')
require('../spinefire')

class Posts extends Spine.Model
  @configure 'Post', 'todo'
  @extend Spine.Model.Firebase
  @url = 'https://brilliant-inferno-3418.firebaseio.com'

Posts.bind 'refresh', ->
#   console.log Posts.first().todo
  Posts.first().updateAttribute('todo', 'test123')

Posts.fetch()