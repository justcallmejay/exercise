class RoutineSerializer < ActiveModel::Serializer
attributes :id, :name

has_many :workouts
# has_many :exercise_routines

end