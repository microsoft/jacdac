
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { SensorReg } from "../specconstants";

    export class SensorTestClient extends JDServiceClient {

        private streamingSamplesReg: JDRegister
        private streamingSamples: number;
        
        private streamingIntervalReg: JDRegister
        private streamingInterval: number;
        
        private streamingPreferredIntervalReg: JDRegister
        private streamingPreferredInterval: number;
                    
  
    
        constructor(service: JDService) {
            super(service);

            this.streamingSamplesReg = service.register(SensorReg.StreamingSamples);
            
            this.streamingIntervalReg = service.register(SensorReg.StreamingInterval);
            
            this.streamingPreferredIntervalReg = service.register(SensorReg.StreamingPreferredInterval);
            
        }

    }