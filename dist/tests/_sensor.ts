
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { SensorReg } from "../specconstants";

    namespace tests {
        export class SensorTestClient extends JDServiceClient {

            private reg_streaming_samples: JDRegister
            private streaming_samples: number;
            
            private reg_streaming_interval: JDRegister
            private streaming_interval: number;
            
            private reg_streaming_preferred_interval: JDRegister
            private streaming_preferred_interval: number;
                        
  
        
            constructor(service: JDService) {
                super(service);

                this.reg_streaming_samples = service.register(SensorReg.StreamingSamples);
                const [tmp_streaming_samples] = useRegisterUnpackedValue<[number]>(this.reg_streaming_samples);
                this.streaming_samples = tmp_streaming_samples;
                
                this.reg_streaming_interval = service.register(SensorReg.StreamingInterval);
                const [tmp_streaming_interval] = useRegisterUnpackedValue<[number]>(this.reg_streaming_interval);
                this.streaming_interval = tmp_streaming_interval;
                
                this.reg_streaming_preferred_interval = service.register(SensorReg.StreamingPreferredInterval);
                const [tmp_streaming_preferred_interval] = useRegisterUnpackedValue<[number]>(this.reg_streaming_preferred_interval);
                this.streaming_preferred_interval = tmp_streaming_preferred_interval;
                
            }

        }
    }