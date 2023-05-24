class ExerciseRoutineSerializer < ActiveModel::Serializer
attributes :id, :sets, :reps, :rest, :workout

has_one :workout
has_one :routine
has_many :exercise_rxes

def workout
    object.workout
end

end