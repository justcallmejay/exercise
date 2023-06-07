class WeightsController < ApplicationController

    wrap_parameters format: []
    skip_before_action :authorized_user, only: [:create]

    def create
        weight = Weight.create(weight_params)
        if weight.valid?
            render json: weight, status: :ok
        else
            render json: { errors: weight.errors }, status: :unprocessable_entity
        end
    end

    private

    def weight_params
        params.permit(
            :user_id,
            :weight
        )
    end

end