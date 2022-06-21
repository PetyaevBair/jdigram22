$(function () {
  
    var $crop_x = $("input#logo_crop_x"),
        $crop_y = $("input#logo_crop_y"),
        $crop_w = $("input#logo_crop_w"),
        $crop_h = $("input#logo_crop_h");
    $crop_x.val('');
    $crop_y.val('');
    $crop_h.val('');
    $crop_w.val('');


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
        const _this = this;

       // console.log(this)
        const modal = document.getElementById('upload-modal');
        $('#upload-modal').modal('show');
        // modal.modal('show');

        var canvas  = $("#canvas"),
            context = canvas.get(0).getContext("2d"),
            $result = $('#result');

        modal.addEventListener('shown.bs.modal', function () {
            console.log('Modal shown');

            if (_this.files && _this.files[0]) {
                if ( _this.files[0].type.match(/^image\//) ) {
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
                    reader.readAsDataURL(_this.files[0]);
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

});