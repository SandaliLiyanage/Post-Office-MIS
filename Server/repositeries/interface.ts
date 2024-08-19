interface IUserRepository {
    create(email: string, password:string):Promise<string>
}