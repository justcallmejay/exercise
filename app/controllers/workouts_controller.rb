class WorkoutsController < ApplicationController

    wrap_parameters format: []

    def index
        exercise = Workout.where(muscles: params[:muscles])
        render json: exercise, status: :ok
    end

    # def show
    #     exercise = Workout.find(params[:id])
    #     render json: exercise, status: :ok
    # end

end