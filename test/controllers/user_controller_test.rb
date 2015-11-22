require 'test_helper'

class UserControllerTest < ActionController::TestCase

  setup do
    @user = User.new email: "teste@teste.com", password: "teste123", name: "John"
  end

 test "should get profile" do
    # get :profile, id: 123
    # assert_response :sucess
  end

  test "should follow user" do
  end

  test "should unfollow user" do
  end

  test "should block user" do
  end

  test "should unblock user" do
  end

  test "should update user" do
  end
end
