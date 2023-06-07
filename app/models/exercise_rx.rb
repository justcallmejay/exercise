class ExerciseRx < ApplicationRecord
    belongs_to :exercise_routine
    
    # validates :intensity, numericality: { greater_than_or_equal_to: 1, message: "Must enter more than one" }, on: :update
    # validate :is_zero, on: :update
    # validates_length_of :completed, :minimum => 0, :allow_nil => false, on: :update

    # validates :completed, presence: true, unless: :new_record?
    # validate :is_nil, on: :update
    validates :weight, presence: { message: "Weight cannot be blank" }
    validates :percent_completed, numericality: { greater_than_or_equal_to: 1, message: "Enter completed reps if not done"}, on: :update
    
    # before_validation :is_nil, on: :update
    # def is_nil
    #     if completed.nil? && !new_record?
    #          errors.add( :completed, 'Ayy ay ay' )
    #     end
    # end

    # def is_zero
    #     if self.intensity == 0
    #         errors.add( :intensity, 'Must be greater than 0' )
    #     end
    # end

end