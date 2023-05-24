class Routine < ApplicationRecord
    belongs_to :user

    has_many :exercise_routines, dependent: :destroy
    has_many :workouts, through: :exercise_routines

end