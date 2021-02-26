
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { PotentiometerReg } from "../specconstants";

    export class PotentiometerTestClient extends JDServiceClient {

        private positionReg: JDRegister
        private position: number;
        
        private variantReg: JDRegister
        private variant: number;
                    
  
    
        constructor(service: JDService) {
            super(service);

            this.positionReg = service.register(PotentiometerReg.Position);
            
            this.variantReg = service.register(PotentiometerReg.Variant);
            
        }

        public test0_cmd0() {
            let expr = "move the slider/potentiometer";
            return expr
        };
        
        public test0_cmd1() {
            let expr = "did the position register's value change?";
            return expr
        };
        
        public test1_cmd0() {
            let expr = "Minimize the position value";
            return expr
        };
        
        public test1_cmd1() {
            let expr = "did the position register's value become 0?";
            return expr
        };
        
        public test2_cmd0() {
            let expr = "Maximize the position value";
            return expr
        };
        
        public test2_cmd1() {
            let expr = "did the position register's become 1?";
            return expr
        };
        
    }