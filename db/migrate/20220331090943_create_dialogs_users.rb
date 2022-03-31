class CreateDialogsUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :dialogs_users do |t|
      t.integer :user_id
      t.integer :dialog_id

      t.timestamps
    end
  end
end
