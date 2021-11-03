import ServerImplentation from './serverServices/playerAccountService';
import DummyImplentation from './dummyServices/playerAccountService';
import {ServerCalls} from '../constants';
export default ServerCalls ? ServerImplentation : DummyImplentation;