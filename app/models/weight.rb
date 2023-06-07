class Weight < ApplicationRecord
    belongs_to :user

    validates :weight, presence: true
    validates :weight, presence: { message: "must enter weight"}
    validates :weight, numericality: { greater_than_or_equal_to: 50, less_than_or_equal_to: 700, message: "must be between 50 and 700 lbs" }
    

end