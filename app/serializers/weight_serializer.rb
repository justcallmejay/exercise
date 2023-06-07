class WeightSerializer < ActiveModel::Serializer
    attributes :weight, :created_at

    has_one :user

end