class ExerciseRoutinesController < ApplicationController

    wrap_parameters format: []

    def index
        exercise_routine = ExerciseRoutine.where(routine_id: params[:routine_id])
        render json: exercise_routine, status: :ok
    end

    def create
        exercise_routine = ExerciseRoutine.create(exercise_routine_params)
        render json: exercise_routine, status: :created
    end

    private

    def exercise_routine_params
        params.permit(
            :routine_id,
            :workout_id,
            :sets,
            :reps,
            :rest
        )
    end

end