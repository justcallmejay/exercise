class ExerciseRoutineSerializer < ActiveModel::Serializer
attributes :id, :sets, :reps, :rest, :exercise_rxes, :workout, :routine

has_one :workout
has_one :routine
has_many :exercise_rxes

#create separate serializer for this
def exercise_rxes
    object.exercise_rxes
end

def workout
    object.workout
end

def routine
    object.routine
end

end