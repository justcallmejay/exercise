class ExerciseRx < ActiveRecord::Migration[7.0]
  def change
    create_table :exercise_rxes do |t|
      t.belongs_to :exercise_routine, null: false, foreign_key: true
      t.datetime :date
      t.float :percent_completed
      t.boolean :completed
      t.integer :intensity 
      t.integer :weight
      
      t.timestamps
    end
  end
end
