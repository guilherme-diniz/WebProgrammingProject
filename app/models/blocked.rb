class Blocked
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :blocked_by, class_name: "User"
  belongs_to :blocked, class_name: "User"

end
