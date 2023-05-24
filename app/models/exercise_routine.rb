class ExerciseRoutine < ApplicationRecord

    belongs_to :workout
    belongs_to :routine

    has_many :exercise_rxes, dependent: :destroy

    validates :sets, presence: true
    validates :reps, presence: true

end