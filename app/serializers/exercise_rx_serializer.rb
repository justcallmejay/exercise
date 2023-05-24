class ExerciseRxSerializer < ActiveModel::Serializer
    attributes :id, :weight, :date, :intensity, :percent_completed, :completed

    has_one :exercise_routine
end