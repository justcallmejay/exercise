class User < ApplicationRecord
    has_secure_password
    
    has_many :routines
    has_many :weights

    validates :username, presence: true
    validates :username, uniqueness: true  
    validates :username, length: { in: 6..20 , message: "must be at least 6 to 20 characters long"}
    
    validates :email, presence: true
    validates :email, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "must include valid email address" }
    
    validates :password, presence: true
    validates :password, length: { minimum: 8, message: "must be at least 8 characters long" }
    validates :password, format: { with: /(?=.*[A-Z])/, message: "must contain at least one capitalized letter." }
    
    validates :feet, presence: true
    validates :feet, presence: { message: "must enter height (ft)"}
    validates :feet, numericality: { greater_than_or_equal_to: 2, less_than_or_equal_to: 8, message: "must be between 2 and 8 feet" }    
    
    validates :inches, presence: true
    validates :inches, presence: { message: "must enter height (in)"}
    validates :inches, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 11, message: "must be between 0 and 11 inches" }
        

end