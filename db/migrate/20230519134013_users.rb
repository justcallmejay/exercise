class Users < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.string :email
      # t.integer :weight
      t.integer :feet
      t.integer :inches

      t.timestamps
    end
  end
end
