require 'test_helper'

class PostTest < ActiveSupport::TestCase

  test "should not post without user" do
    post = Post.new
    post.text = "teste"

    assert post.invalid?
    assert post.errors[:user].any?
  end

  test "should not post blank" do
      user = User.new
      user.email = "teste@teste.com"
      user.password = "12345678"

      post = Post.new
      post.text = ""
      post.user = user

      assert post.invalid?
      assert post.errors[:text].any?
  end

  test "post should not exceed 140 characters" do
      user = User.new
      user.email = "teste@teste.com"
      user.password = "12345678"

      post = Post.new
      post.text = "hjhjhdhsjskajs hdshjsdkshsjks dshajdshdskdhskjdhdjd dshajdshjskdhsdsjkdsa dsjhdsjhkdhsj dhsjdskdskdshdshdkdj dsadsjhdsajkhjkdsahjkhsd dshdjdhskdh"
      post.user = user

      assert post.invalid?
      assert post.errors[:text].any?
  end
end
