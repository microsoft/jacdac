
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { BaseReg } from "../specconstants";

    export class BaseTestClient extends JDServiceClient {

        private instanceNameReg: JDRegister
        private instanceName: number;
        
        private statusCodeReg: JDRegister
        private statusCode: number;
                    
  
    
        constructor(service: JDService) {
            super(service);

            this.instanceNameReg = service.register(BaseReg.InstanceName);
            
            this.statusCodeReg = service.register(BaseReg.StatusCode);
            
        }

    }