class TasksController < ApplicationController
    def index
        tasks = Task.all

        render inertia: "TasksIndex", props: { tasks: }
    end

    def create
        @task = Task.new(task_params)
        
        if @task.save
            head :ok
        else
            head :bad_request
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
        params.require(:task).permit(:done, :description)
    end
end
