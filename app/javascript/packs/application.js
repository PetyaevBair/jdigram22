import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

require('jquery')

import $ from 'jquery';
global.$ = $;

Rails.start()
Turbolinks.start()
ActiveStorage.start()
import "channels"

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

/*function readURL(input) {
    console.log('dfg');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#previewImage').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}

global.readURL = readURL*/
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

$(function () {
  
function crop_image_load(data) {
    var $crop_x = $("input#logo_crop_x"),
        $crop_y = $("input#logo_crop_y"),
        $crop_w = $("input#logo_crop_w"),
        $crop_h = $("input#logo_crop_h");

    $crop_x.val('');
    $crop_y.val('');
    $crop_h.val('');
    $crop_w.val('');

    $crop_x.val(accounting.toFixed(data.x, 6));
    $crop_y.val(accounting.toFixed(data.y, 6));
    $crop_h.val(accounting.toFixed(data.height, 6));
    $crop_w.val(accounting.toFixed(data.width, 6));

    // $crop_x.val(Math.round(data.x));
    // $crop_y.val(Math.round(data.y));
    // $crop_h.val(Math.round(data.height));
    // $crop_w.val(Math.round(data.width));
}
  
    var $crop_x = $("input#logo_crop_x"),
        $crop_y = $("input#logo_crop_y"),
        $crop_w = $("input#logo_crop_w"),
        $crop_h = $("input#logo_crop_h");
    $crop_x.val('');
    $crop_y.val('');
    $crop_h.val('');
    $crop_w.val('');

    var $image = $('#image');
    var $button = $('#button');
    var $result = $('#result');
    var croppable = false;
    var cropBoxData;
    var canvasData;
    var img = new Image();
    var img_tag = $('#business_logo_image').parent().find("#preview_avatar").children("img");
    $('#upload-modal').on('shown.bs.modal', function () {
        $image.cropper({
            preview: '#preview',
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 16 / 9,
            autoCrop: false,
            restore: false,
            guides: false,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            scalable: false,
            zoomable: false,
            rotatable: false,
            getData: true,
            checkCrossOrigin: true,
            modal: true,
            center: true,
            autoCropArea: 1,
            // allowMove : true,
            // allowResize : true,
            // allowSelect : true,
            // minSelect : [0, 0],
            // outlineOpacity : 0.5,
            // overlayOpacity : 0.5,
            // selectionPosition : [0, 0],
            // selectionWidth : 0,
            // selectionHeight : 0,
            ready: function () {
                $image.cropper('setCanvasData', canvasData);
                $image.cropper('setCropBoxData', cropBoxData);
            },

            crop: function (event) {
                crop_image_load(event);
                console.log('event:', event);
                // console.log(event.x);
                // console.log(event.y);
                // console.log(event.width);
                // console.log(event.height);
                // console.log(event.rotate);
                // console.log(event.scaleX);
                // console.log(event.scaleY);
            }
        });
    }).on('hidden.bs.modal', function () {
        cropBoxData = $image.cropper('getCropBoxData');
        canvasData = $image.cropper('getCanvasData');

        img.src = img_tag;
      
        // cropImage();
        $image.cropper('destroy');
    });

    $button.on('click', function () {

        var croppedCanvas;
        var roundedCanvas;

        if (!croppable) {
            return;
        }

        // Crop
        croppedCanvas = $image.cropper('getCroppedCanvas');

        // Round
        roundedCanvas = getRoundedCanvas(croppedCanvas);
        //console.log('<img src="' + roundedCanvas.toDataURL() + '">')
        // Show
        $result.html('<img src="' + roundedCanvas.toDataURL() + '">');
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#business_logo_image").change(function () {

       // console.log(this)
        $('#upload-modal').modal('show');

        var canvas  = $("#canvas"),
            context = canvas.get(0).getContext("2d"),
            $result = $('#result');

        if (this.files && this.files[0]) {
            if ( this.files[0].type.match(/^image\//) ) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    var img = new Image();
                    img.onload = function() {

                        context.canvas.height = img.height;
                        context.canvas.width  = img.width;
                        context.drawImage(img, 0, 0);

                        var cropper = canvas.cropper({
                            aspectRatio: 16 / 9,
                            crop(event) {
                            console.log(event.detail.x);
                            console.log(event.detail.y);
                            console.log(event.detail.width);
                            console.log(event.detail.height);
                            console.log(event.detail.rotate);
                            console.log(event.detail.scaleX);
                            console.log(event.detail.scaleY);

                            var logo_crop_x = event.detail.x
                            var logo_crop_y = event.detail.y
                            var logo_crop_w = event.detail.width
                            var logo_crop_h = event.detail.height

                            $("#logo_crop_x").val(event.detail.x);
                            $("#logo_crop_y").val(event.detail.y);
                            $("#logo_crop_w").val(event.detail.width);
                            $("#logo_crop_h").val(event.detail.height);
                          }
                        });

                        $('#btnCrop').click(function() {
                            console.log("Вот и наше событие",evt);
                            readURL(evt);
                            console.log("Вот и наш канава кроппер", canvas.cropper('getCroppedCanvas').toDataURL("image/png"));
                            $('#upload-modal').modal('toggle');
                            var croppedImage = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
                            $('#image').attr('src', croppedImage);
                        });

                        $('#btnRestore').click(function() {
                            canvas.cropper('reset');
                            $result.empty();
                        });
                    };
                    img.src = evt.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
            else {
                alert("Invalid file type! Please select an image file.");
            }
        }
        else {
            alert('No file(s) selected.');
        }
    });

    var canvas  = $("#canvas"),
        context = canvas.get(0).getContext("2d"),
        $result = $('#result');

    $('#fileInput').on( 'change', function(){
        if (this.files && this.files[0]) {
            if ( this.files[0].type.match(/^image\//) ) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    var img = new Image();
                    img.onload = function() {
                        context.canvas.height = img.height;
                        context.canvas.width  = img.width;
                        context.drawImage(img, 0, 0);
                        var cropper = canvas.cropper({
                            autoCropArea: 1,
                            aspectRatio: 16 / 9
                        });
                        $('#btnCrop').click(function() {
                            
                            // Get a string base 64 data url
                            
                        });
                        $('#btnRestore').click(function() {
                            canvas.cropper('reset');
                            $result.empty();
                        });
                    };
                    img.src = evt.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
            else {
                alert("Invalid file type! Please select an image file.");
            }
        }
        else {
            alert('No file(s) selected.');
        }
    });

});