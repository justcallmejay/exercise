class RoutinesController < ApplicationController

    wrap_parameters format: []

    def last_workout
        routine = Routine.find_by(id: params[:id]).exercise_routines
        render json: routine, include: {exercise_rxes: { only: [:weight]}}, status: :ok
    end    

    def index
        routine = Routine.where(user_id: params[:user_id])
        render json: routine, status: :ok
    end

    def create
        routine = Routine.create(routine_params)
        render json: routine, status: :created
    end

    def all_routines
        routine = Routine.all
        render json: routine, status: :ok
    end

    def destroy
        routine = Routine.find_by(id: params[:id])
        if routine
            routine.destroy
            #head :no_content will not cause a delete in front end because there is nothing returning to front end
            render json: routine.id
        else
            render json: { error: "Routine not found" }, status: :not_found
        end
    end

    private

    def routine_params
        params.permit(
            :name,
            :user_id
        )
    end

end