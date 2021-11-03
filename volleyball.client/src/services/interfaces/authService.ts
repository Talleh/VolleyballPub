import AuthResult from '../../models/authResult';
import RegistrationModel from "../../models/registrationModel";

export default interface AuthService
{
    facebookLogin:(facebookToken:string) => Promise<boolean>,
    emailRegistration:(model:RegistrationModel) => Promise<AuthResult>,
    emailLogin:(model:RegistrationModel) => Promise<AuthResult>,
    logout:() => void
}