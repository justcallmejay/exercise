class UsersController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorized_user, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def create
        user = User.create(users_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors }, status: :unprocessable_entity
        end
    end

    private

    def users_params
        params.permit(:name, :username, :password, :email, :feet, :inches)
    end

end