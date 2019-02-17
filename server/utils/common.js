
const PasswordValidator = require('password-validator')

module.exports.isPasswordSatisfyPolicy = (password) => {
  const passwordSchema = new PasswordValidator()
  passwordSchema
      .is().min(8)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .letters()
  return passwordSchema.validate(password)
}
