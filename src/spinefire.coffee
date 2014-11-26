Spine = @Spine or require('spine')
Firebase = @Firebase or require('firebase')


class FirebaseCollection
  constructor: (@model) ->
    collection = @model.className.toLowerCase() + 's'

    if typeof @model.url is 'function'
      firebaseRef = [@model.url(), collection].join('/')
    else
      firebaseRef = [@model.url, collection].join('/')

    @firebase = new Firebase(firebaseRef)

    @firebase.on('value', @_setLocal)

  _setLocal: (snapshot) =>
    snapshot = snapshot.val()
    records = []
    for id in Object.keys(snapshot)
      snapshot[id].id = id
      records.push(snapshot[id])

    @model.refresh(records)


Spine.Model.Firebase =
  extended: ->
    @fetch @firebaseFetch

  firebaseFetch: ->
    new FirebaseCollection(@)