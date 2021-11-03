import ServerImplentation from './serverServices/hallService';
import DummyImplentation from './dummyServices/hallService';
import {ServerCalls} from '../constants';
export default ServerCalls ? ServerImplentation : DummyImplentation;