class Workout < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.string :name
      t.string :kind
      t.string :image
      t.string :muscles
      t.string :difficulty

      t.timestamps
    end
  end
end
