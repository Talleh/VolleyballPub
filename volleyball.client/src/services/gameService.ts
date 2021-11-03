import ServerImplentation from './serverServices/gameService';
import DummyImplentation from './dummyServices/gameService';
import {ServerCalls} from '../constants';
export default ServerCalls ? ServerImplentation : DummyImplentation;