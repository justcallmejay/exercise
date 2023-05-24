class UserRoutineSerializer < ActiveModel::Serializer
    attributes :id, :username

    has_many :routines

end