class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :name, :feet, :inches, :created_at

    has_many :routines
    has_many :weights

end