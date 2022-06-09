class LogoImageUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :large do
    process :crop_image
    resize_to_fill(800, 800)
  end

  version :medium do
    process :crop_image
    resize_to_limit(600, 600)
  end

  version :thumb do
    process :crop_image
    resize_to_fill(100, 100)
  end

  version :tiny, from_version: :thumb do
    process resize_to_fill: [20, 20]
  end

  def crop_image

    resize_to_limit(600, 600)

    unless $logo_crop_x.blank?

      puts " \n\n\n\n\n\n Попытка номер 2 \n\n\n\n\n\n\n\n\n\n x: #{$logo_crop_x} \n\n\n\n y: #{$logo_crop_y} \n\n\n\n w: #{$logo_crop_w} \n\n\n\n\n h: #{$logo_crop_h}"
      manipulate! do |image|
        x = $logo_crop_x.to_f
        y = $logo_crop_y.to_f
        w = $logo_crop_w.to_f
        h = $logo_crop_h.to_f
        x = x.round(3)
        y = y.round(3)
        w = w.round(3)
        h = h.round(3)
        puts " \n\n\n\n\n\n Попытка номер 3 \n\n\n\n\n\n\n\n\n\n x: #{x} \n\n\n\n y: #{y} \n\n\n\n w: #{w} \n\n\n\n\n h: #{h}"

        #img.crop "#{w}x#{h}+#{x}+#{y}"
        puts "\n\n\n\n\n\n\n а вот и аймедж #{image}  \n\n\n\n\n\n"
        puts "CROPPer : #{[[w, h].join('x'), [x, y].join('+')].join('+')}"
        image.crop("#{w}x#{h}+#{x}+#{y}")
        image
      end
    end

  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  #def filename
  #  "#{secure_token(10)}.#{file.extension}" if original_filename.present?
  #end

  protected
  def secure_token(length = 16)
    return SecureRandom.hex(length / 2)
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add an allowlist of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_allowlist
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
