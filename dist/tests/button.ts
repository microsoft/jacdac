
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { ButtonReg } from "../specconstants";

    namespace tests {
        export class ButtonTestClient extends JDServiceClient {

            private reg_pressed: JDRegister
            private pressed: number;
                        
  
        
            constructor(service: JDService) {
                super(service);

                this.reg_pressed = service.register(ButtonReg.Pressed);
                const [tmp_pressed] = useRegisterUnpackedValue<[number]>(this.reg_pressed);
                this.pressed = tmp_pressed;
                
            }

            public test0_cmd0() {
                return "press the button and release it immediately"
            };
            
            public test1_cmd0() {
                return "press the button down for 500ms and less than 1500ms and release it"
            };
            
            public test2_cmd0() {
                return "press the button down at least 1500ms and release it"
            };
            
        }
    }