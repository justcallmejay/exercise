class WorkoutSerializer < ActiveModel::Serializer
    attributes :id, :name, :kind, :image, :muscles, :difficulty

    has_many :routines

end