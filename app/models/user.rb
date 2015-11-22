class User
  include Mongoid::Document
  include Mongoid::Paperclip
  include Mongoid::Followable
  include Mongoid::Follower
  include Mongoid::Timestamps
  include Mongoid::Search

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  has_mongoid_attached_file :avatar,styles: {thumb: "250x250>", minithumb:  "55x54#" }
  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  has_many :blocked_users, class_name: "Blocked", foreign_key: "blocked_by_id", dependent: :destroy
  has_many :posts, class_name: "Post", dependent: :destroy

  field :name, type: String

  search_in :name

  def self.serialize_from_session(key, salt)
  (key = key.first) if key.kind_of? Array
  (key = BSON::ObjectId.from_string(key['$oid'])) if key.kind_of? Hash

  record = to_adapter.get(key)
  record if record && record.authenticatable_salt == salt
end

def self.serialize_into_session(record)
  [record.id.to_s, record.authenticatable_salt]
end

def blocked_by user
  user.blocked_users.map{|u| u.blocked }.to_a.include?(self)
end


end
