class RoutinesController < ApplicationController

    wrap_parameters format: []
    
    def index
        routines = Routine.where(user_id: params[:user_id])
        render json: routines, status: :ok
    end

    def get_routine_by_date
        routines = Routine.find_by(user_id: params[:user_id], name: params[:name])&.id
        exercise_routines = ExerciseRoutine.where(routine_id: routines).pluck(:id)
        exercise_rxes = ExerciseRx.where(date: params[:date])
        find_ex = exercise_rxes.filter {|e| exercise_routines.include?(e.exercise_routine_id) }
        render json: find_ex, include: { exercise_routine: { workout: {} } }, status: :ok
    end
    
    def create
        routine = Routine.create(routine_params)
        if routine.valid?
            render json: routine, status: :created
        else
            render json: { errors: routine.errors }, status: :unprocessable_entity
        end
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

    def routine_names
        routines = Routine.where(user_id: params[:user_id])
        render json: routines, 
        each_serializer: RoutineNameSerializer,
        status: :ok
    end
    
    def last_workout
        routine = Routine.find_by(id: params[:id]).exercise_routines
        render json: routine, include: {exercise_rxes: { only: [:weight]}}, status: :ok
    end

    def get_last_routine
        routines = Routine.find_by(user_id: params[:user_id])&.id
        exercise_routines = ExerciseRoutine.where(routine_id: routines).pluck(:id)
        exercise_rxes = ExerciseRx.where(date: params[:date])
        find_ex = exercise_rxes.filter {|e| exercise_routines.include?(e.exercise_routine_id) }
        render json: find_ex, include: { exercise_routine: { workout: {} } }, status: :ok
    end

    private

    def routine_params
        params.permit(
            :name,
            :user_id
        )
    end

end