class Weight < ActiveRecord::Migration[7.0]
  def change

    create_table :weights do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.float :weight

      t.timestamps
    end
  end
end
