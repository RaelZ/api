const strongPassword = (name, email, password) => {
  const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  
  const passwordLowerCase = password.toLowerCase()
  const firstNameLowerCase = name.toLowerCase()
  const emailLowerCase = email.toLowerCase()

  if (
    !strongPassword.test(password) ||
    passwordLowerCase.includes(firstNameLowerCase) ||
    passwordLowerCase.includes(emailLowerCase)
  ) {
    return false
  }
  return true
}
module.exports = { strongPassword }
