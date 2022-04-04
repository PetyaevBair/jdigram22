import $ from 'jquery';

global.$ = $;
require('jquery')

import consumer from "./consumer"

  $(document).on('turbolinks:load', function () {
  consumer.subscriptions.create(
     {
       channel: "DialogChannel",
       dialog_id: $('#dialog_messages').attr('data-dialog-id')
     },

     {

     connected(){
       console.log('CONNECTED')
     },

     disconnected() {
       // Called when the subscription has been terminated by the server
     },

     received(data) {

       console.log('RECIEVED', data)

       var messages = $('#dialog_messages');
       messages.append(data['user'] + ": " + data['body']);
       // Called when there's incoming data on the websocket for this channel
     }
  });
 })