class ExerciseRoutine < ActiveRecord::Migration[7.0]
  def change
    create_table :exercise_routines do |t|
      t.belongs_to :routine, null: false, foreign_key: true
      t.belongs_to :workout, null: false, foreign_key: true
      t.integer :sets
      t.integer :reps
      t.integer :rest

      t.timestamps
    end
  end
end
