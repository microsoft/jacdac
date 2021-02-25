
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { BaseReg } from "../specconstants";

    namespace tests {
        export class BaseTestClient extends JDServiceClient {

            private reg_instance_name: JDRegister
            private instance_name: number;
            
            private reg_status_code: JDRegister
            private status_code: number;
                        
  
        
            constructor(service: JDService) {
                super(service);

                this.reg_instance_name = service.register(BaseReg.InstanceName);
                const [tmp_instance_name] = useRegisterUnpackedValue<[number]>(this.reg_instance_name);
                this.instance_name = tmp_instance_name;
                
                this.reg_status_code = service.register(BaseReg.StatusCode);
                const [tmp_status_code] = useRegisterUnpackedValue<[number]>(this.reg_status_code);
                this.status_code = tmp_status_code;
                
            }

        }
    }