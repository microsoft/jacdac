
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
                let expr = "press the button and release it immediately";
                return expr
            };
            
            public test0_cmd1() {
                let expr = "did you observe an Up event, followed by a Down event?";
                return expr
            };
            
            public test1_cmd0() {
                let expr = "press the button down for 500ms and less than 1500ms and release it";
                return expr
            };
            
            public test1_cmd1() {
                let expr = "did you observe a Click event?";
                return expr
            };
            
            public test2_cmd0() {
                let expr = "press the button down at least 1500ms and release it";
                return expr
            };
            
            public test2_cmd1() {
                let expr = "did you observe a LongClick event?";
                return expr
            };
            
        }
    }