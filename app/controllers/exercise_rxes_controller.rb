class ExerciseRxesController < ApplicationController

    wrap_parameters format: []

def show
    exercise_rx = ExerciseRx.find_by(id: params[:id])
    render json: exercise_rx, status: :ok
end

def create
    exercise_rx = ExerciseRx.create(exercise_rx_params)
    if exercise_rx.valid?
        render json: exercise_rx, status: :created
    else
        render json: { errors: exercise_rx.errors }, status: :unprocessable_entity
    end
end

def update
    exercise_rx = ExerciseRx.find_by(id: params[:id])
    if exercise_rx
        exercise_rx.update(exercise_rx_params)
        render json: exercise_rx
    else
        render json: { error: exercise_rx.errors }, status: :unprocessable_entity
    end
end

def destroy
    exercise_rx = ExerciseRx.find_by(id: params[:id])
    if exercise_rx.present?
        exercise_rx.destroy
        render json: exercise_rx
    else 
        render json: { errors: exercise_rx.errors }, status: :not_found
    end
end

def complete_routine
    exercise_rx = ExerciseRx.where.not(completed: nil)
    render json: exercise_rx, status: :ok
end

def last_routine
    exercise_rx = ExerciseRx.where(date: params[:date], completed: nil)
    render json: exercise_rx, status: :ok
end

private

def exercise_rx_params
    params.permit(
        :id,
        :exercise_routine_id,
        :date,
        :percent_completed,
        :completed,
        :intensity,
        :weight,
    )
end

end