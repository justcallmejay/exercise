class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def create
        user = User.find_by(username:params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.idd
            render json: user, status: :ok
        else
            render json: { error: "Invalid Username or Password" }, status: :unauthorized
        end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
