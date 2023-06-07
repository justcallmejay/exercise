class WorkoutSerializer < ActiveModel::Serializer
    attributes :id, :name, :kind, :image, :muscles, :difficulty, :exercise_routines

    has_many :routines

    def exercise_routines
        object.exercise_routines
    end

    def exercise_routines
        object.exercise_routines.map do |exercise_routine|
          exercise_routine.as_json.merge(exercise_rxes: exercise_routine.exercise_rxes)
        end
      end

end