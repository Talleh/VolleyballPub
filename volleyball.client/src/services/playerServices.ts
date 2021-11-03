import ServerImplentation from './serverServices/playerServices';
import DummyImplentation from './dummyServices/playerServices';
import {ServerCalls} from '../constants';
export default ServerCalls ? ServerImplentation : DummyImplentation;