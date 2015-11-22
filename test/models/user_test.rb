require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "user attributes must not be empty" do
    user = User.new
    assert user.invalid?
    assert user.errors[:email].any?
    assert user.errors[:password].any?
  end

  test 'password should be a least 8 characters' do
    user = User.new
    user.password = "1234567"
    assert user.invalid?
    assert user.errors[:password].any?
  end

  test 'email should be sample@sample.com' do
    user = User.new
    user.password = "12345678"

    user.email = "abc@abc"
    assert user.invalid?
    assert user.errors[:email].any?

    user.email = "abc@abc.com"
    assert user.valid?
    assert user.errors[:email].none?
  end

  test "email should be unique" do
    user = User.new
    user.email = "teste@teste.com"
    user.password = "123456789"

    assert user.invalid?
    assert_equal ["já está em uso"], user.errors[:email]
  end
end
