class Exercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :kind
      t.string :image
      t.string :muscles
      t.string :difficulty

      t.timestamps
    end
  end
end
