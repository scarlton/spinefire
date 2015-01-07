Spine = @Spine or require('spine')
Firebase = @Firebase or require('firebase')


class Collection
  constructor: (@model) ->

  _setLocal: (snapshot) =>
    snapshot = snapshot.val()
    records = []
    for id in Object.keys(snapshot)
      snapshot[id].id = id
      records.push(snapshot[id])

    @model.refresh(records)

class Singleton
  constructor: (@record) ->
    @model = @record.constructor

  reload: ->

  create: ->

  update: (options) ->
    @model.firebase.child(@record.id).update(todo: @record.todo)

  destroy: ->


Extend =
  collection: -> new Collection(this)

  generateFirebaseRef: ->
    collection = @className.toLowerCase() + 's'

    if typeof @url is 'function'
      [@url(), collection].join('/')
    else
      [@url, collection].join('/')

Include =
  singleton: -> new Singleton(this)

Spine.Model.Firebase =
  extended: ->
    @fetch @firebaseFetch
    @change @firebaseChange
    @extend Extend
    @include Include

  firebaseFetch: ->
    coll = @collection()

    unless @firebase?
      @firebase = new Firebase(@generateFirebaseRef())

      @firebase.on('value', coll._setLocal)

  firebaseChange: (record, type, options={}) ->
    record.singleton()[type]?(options)