class ExerciseRoutinesController < ApplicationController

    wrap_parameters format: []

    def index
        exercise_routine = ExerciseRoutine.where(routine_id: params[:routine_id])
        render json: exercise_routine, status: :ok
    end

    def create
        exercise_routine = ExerciseRoutine.create(exercise_routine_params)
        if exercise_routine.valid?
            render json: exercise_routine, status: :created
        else
            render json: { errors: exercise_routine.errors }, status: :unprocessable_entity
        end
    end

    def all_exercise_routines
        exercise_routine = ExerciseRoutine.where(routine_id: params[:routine_id])
        render json: exercise_routine, include: :exercise_rxes
    end

    def data_from_workout
        exercise_routine = ExerciseRoutine.where(workout_id: params[:workout_id])
        render json: exercise_routine
    end

    def find_completed_routine
        exercise_routines = ExerciseRoutine.joins(:routine).where(routines: { user_id: params[:user_id] })
      
        result = exercise_routines.flat_map do |exercise_routine|
          exercise_routine.exercise_rxes.flat_map do |rx|
            {
              name: exercise_routine.routine.name,
              date: rx.date,
              id: exercise_routine.id,
              completed: rx.completed
            }
          end
        end.uniq { |obj| [obj[:date], obj[:name]] }
      
        render json: result, status: :ok
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