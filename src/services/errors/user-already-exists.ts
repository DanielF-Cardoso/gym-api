export class UserAlreadyExists extends Error {
  constructor() {
    super('E-mail already exists')
    this.name = 'UserAlreadyExists'
  }
}