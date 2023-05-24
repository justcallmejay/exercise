class User < ApplicationRecord
    has_secure_password
    
    has_many :routines

    validates :username, uniqueness: true  
    validates :email, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/,
    message: "must include valid email address" }
    validates :username, length: { in: 6..20 , message: "must be at least 6 to 20 characters long"}
    validates :password, 
        length: { minimum: 8, message: "must be at least 8 characters long" }, 
        format: { with: /(?=.*[A-Z])/, message: "must contain at least one capitalized letter." }
    

end