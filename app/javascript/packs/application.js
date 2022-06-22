import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

import 'controllers'

require('jquery')

import $ from 'jquery';
global.$ = $;

Rails.start()
Turbolinks.start()
ActiveStorage.start()
import "channels"

/*import jQueryBridget from 'jquery-bridget'
global.jQueryBridget = jQueryBridget*/

/*import infiniteScroll from 'infinite-scroll'
global.infiniteScroll = infiniteScroll*/
/*import imagesLoaded from 'imagesloaded'
global.imagesLoaded = imagesLoaded
import Masonry from 'masonry-layout'
global.Masonry = Masonry*/

require("./crop-render")
//require("./infinite_scrolling")

import Cropper from "cropperjs"
global.Cropper = Cropper
import "jquery-cropper"

import accounting from "accounting-js"
global.accounting = accounting

require("@popperjs/core")

import "bootstrap"
// Import the specific modules you may need (Modal, Alert, etc)
import { Tooltip, Popover } from "bootstrap"


// The stylesheet location we created earlier
require("../stylesheets/application.scss")
import "@fortawesome/fontawesome-free/js/all";
// If you're using Turbolinks. Otherwise simply use: jQuery(function () {

document.addEventListener("turbolinks:load", () => {
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

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

import "controllers"
