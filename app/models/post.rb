class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search

  belongs_to :user

  field :text, type: String
  validates :text, presence: true, length: { :maximum => 140, :allow_blank => false }
  validates :user, presence: true

  search_in :text
end
