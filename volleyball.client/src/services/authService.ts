import ServerImplentation from './serverServices/authService';
import DummyImplentation from './dummyServices/authService';
import {ServerCalls} from '../constants';
export default ServerCalls ? ServerImplentation : DummyImplentation;