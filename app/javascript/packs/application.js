// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import $ from 'jquery';

global.$ = $;
require('jquery')

Rails.start()
Turbolinks.start()
ActiveStorage.start()
import "channels"

require("@popperjs/core")

import "bootstrap"

import { Tooltip, Popover } from "bootstrap"

require("../stylesheets/application.scss")

document.addEventListener("turbolinks:load", () => {
    console.log('');
    // Both of these are from the Bootstrap 5 docs
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
    })

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new Popover(popoverTriggerEl)
    })
})

// $(document).ready(function(){
    
// });
console.log('Application js');
function readURL(input) {
    console.log('dfg');
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}

global.readURL = readURL