class Task < ApplicationRecord
    attribute :done, :boolean, default: false

    validates :description, presence: true, length: { minimum: 3 }
end
