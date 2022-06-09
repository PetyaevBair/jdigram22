class AddManyFieldsToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :logo_crop_x, :integer
    add_column :posts, :logo_crop_y, :integer
    add_column :posts, :logo_crop_w, :integer
    add_column :posts, :logo_crop_h, :integer
  end
end
