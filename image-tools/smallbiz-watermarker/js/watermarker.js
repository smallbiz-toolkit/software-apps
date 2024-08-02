(function($) {
    $.fn.watermarkImage = function(waterMarkImagePath, onResultCallback, options) {
        let defaults = {
            spacing: 50,
            wmSizeX: 160,
            wmSizeY: 50,
            wmTrans: 0.5,
            position: 'tiled',
            center: false
        }

        const settings = $.extend({}, defaults, options);

        var cCanvas = $("<canvas>", {
            id: "wmCanvas",
            style: "display: none;",
            width: 100,
            height: 100,
        });
        cCanvas.appendTo("body");
        let jCanvas = $("#wmCanvas");
        var canvas = jCanvas[0];

        let ctx = canvas.getContext("2d");
        let imageInput = $(this);
        let finalImage = null;
        imageInput.change(function() {
            processImage();
        });

        function processImage() {
            let img = new Image();
            let file = imageInput.prop('files')[0];
            let reader = new FileReader();

            reader.onload = function(e) {
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                    document.dispatchEvent(new CustomEvent("onImageLoaded"));
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);

            document.addEventListener("onImageLoaded", function() {
                var width = img.naturalWidth;
                var height = img.naturalHeight;
                jCanvas.attr("width", width);
                jCanvas.attr("height", height);
                ctx.drawImage(img, 0, 0);
                addWatermarkPattern();
            })
        }

        function addWatermarkPattern() {
			console.log('settings.position:', settings.position);
            var img2 = new Image();
            img2.onload = function() {
                var watermarkWidth = settings.wmSizeX;
                var watermarkHeight = settings.wmSizeY;

                ctx.globalAlpha = settings.wmTrans;

                var horizontalRepeat = 1;
                var verticalRepeat = 1;
                var xPosition = 0;
                var yPosition = 0;

                switch (settings.position) {
                    case 'topLeft':
                        xPosition = settings.spacing;
                        yPosition = settings.spacing;
                        break;
                    case 'topCenter':
                        xPosition = (canvas.width / 2) - (watermarkWidth / 2);
                        yPosition = settings.spacing;
                        break;
                    case 'topRight':
                        xPosition = canvas.width - watermarkWidth - settings.spacing;
                        yPosition = settings.spacing;
                        break;
                    case 'bottomLeft':
                        xPosition = settings.spacing;
                        yPosition = canvas.height - watermarkHeight - settings.spacing;
                        break;
                    case 'bottomCenter':
                        xPosition = (canvas.width / 2) - (watermarkWidth / 2);
                        yPosition = canvas.height - watermarkHeight - settings.spacing;
                        break;
                    case 'bottomRight':
                        xPosition = canvas.width - watermarkWidth - settings.spacing;
                        yPosition = canvas.height - watermarkHeight - settings.spacing;
                        break;
                    case 'center':
                        xPosition = (canvas.width / 2) - (watermarkWidth / 2);
                        yPosition = (canvas.height / 2) - (watermarkHeight / 2);
                        break;
                    case 'tiled':
                    default:
                        horizontalRepeat = Math.ceil(canvas.width / (watermarkWidth + settings.spacing));
                        verticalRepeat = Math.ceil(canvas.height / (watermarkHeight + settings.spacing));
                        break;
                }

                if (settings.position === 'tiled') {
                    for (var i = 0; i < horizontalRepeat; i++) {
                        for (var j = 0; j < verticalRepeat; j++) {
                            xPosition = i * (watermarkWidth + settings.spacing);
                            yPosition = j * (watermarkHeight + settings.spacing);

                            ctx.save();
                            ctx.translate(xPosition, yPosition);
                            ctx.rotate(Math.PI / 4);
                            ctx.drawImage(img2, 0, 0, settings.wmSizeX, settings.wmSizeY);
                            ctx.restore();
                        }
                    }
                } else {
                    ctx.drawImage(img2, xPosition, yPosition, watermarkWidth, watermarkHeight);
                }

                finalImage = canvas.toDataURL('image/jpg');
                jCanvas.remove();
                onResultCallback(finalImage);
            };
            img2.src = waterMarkImagePath;
        }
        return this;
    }
})(jQuery);