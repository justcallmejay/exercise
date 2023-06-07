class ExerciseRoutine < ApplicationRecord

    belongs_to :workout
    belongs_to :routine

    has_many :exercise_rxes, dependent: :destroy

    validates :sets, presence: { message: "Sets cannot be blank" }
    validates :reps, presence: { message: "Reps cannot be blank" }
    

end