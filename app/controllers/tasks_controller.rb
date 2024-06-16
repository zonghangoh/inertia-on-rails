class TasksController < ApplicationController
    def index
        tasks = Task.all

        render inertia: "TasksIndex", props: { tasks:, errors: [] }
    end

    def create
        task = Task.new(task_params)
        
        if task.save
            redirect_to tasks_path
        else
            render inertia: "TasksIndex", props: { errors: task.errors }
        end
    end
    
    def mark_as_done
        @task = Task.find(params[:id])

        if @task.update(done: true)
            head :ok
        else
            head :bad_request
        end
    end

    private

    def task_params
        params.permit(:done, :description)
    end
end
