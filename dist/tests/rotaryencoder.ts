
    import { JDService } from "../../../src/jdom/service"
    import { JDServiceClient } from "../../../src/jdom/serviceclient"
    import { JDRegister } from "../../../src/jdom/register"
    import { useRegisterUnpackedValue } from "../../../docs/src/jacdac/useRegisterValue";
    import { RotaryEncoderReg } from "../specconstants";

    namespace tests {
        export class RotaryEncoderTestClient extends JDServiceClient {

            private reg_position: JDRegister
            private position: number;
            
            private reg_clicks_per_turn: JDRegister
            private clicks_per_turn: number;
                        

            private save: number = 0;  
        
            constructor(service: JDService) {
                super(service);

                this.reg_position = service.register(RotaryEncoderReg.Position);
                const [tmp_position] = useRegisterUnpackedValue<[number]>(this.reg_position);
                this.position = tmp_position;
                
                this.reg_clicks_per_turn = service.register(RotaryEncoderReg.ClicksPerTurn);
                const [tmp_clicks_per_turn] = useRegisterUnpackedValue<[number]>(this.reg_clicks_per_turn);
                this.clicks_per_turn = tmp_clicks_per_turn;
                
            }

            public test0_cmd0() {
                let expr = "turn the knob back and forth";
                return expr
            };
            
            public test0_cmd1() {
                let expr = "did the position register's value change?";
                return expr
            };
            
            public test1_cmd0() {
                let expr = "turn knob clockwise";
                return expr
            };
            
            public test1_cmd1() {
                let expr = "did the position register's value increase?";
                return expr
            };
            
            public test2_cmd0() {
                let expr = "turn knob counter-clockwise";
                return expr
            };
            
            public test2_cmd1() {
                let expr = "did the position register's value decrease?";
                return expr
            };
            
            public test3_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test3_cmd1() {
                let expr = "turn one complete rotation clockwise";
                return expr
            };
            
            public test3_cmd2() {
                let expr = this.position == this.save + this.clicks_per_turn;
                return expr
            };
            
            public test4_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test4_cmd1() {
                let expr = "turn one complete rotation counter-clockwise";
                return expr
            };
            
            public test4_cmd2() {
                let expr = this.position == this.save - this.clicks_per_turn;
                return expr
            };
            
            public test5_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test5_cmd1() {
                let expr = "slowly turn clockwise one complete rotation";
                return expr
            };
            
            public test5_cmd2() {
                let expr = [ this.save , this.save + this.clicks_per_turn ];
                return expr
            };
            
            public test6_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test6_cmd1() {
                let expr = "slowly turn counter-clockwise one complete rotation";
                return expr
            };
            
            public test6_cmd2() {
                let expr = [ this.save , this.save - this.clicks_per_turn ];
                return expr
            };
            
            public test7_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test7_cmd1() {
                let expr = "note knob's physical position";
                return expr
            };
            
            public test7_cmd2() {
                let expr = "quickly turn clockwise one complete rotation";
                return expr
            };
            
            public test7_cmd3() {
                let expr = this.position == this.save + this.clicks_per_turn;
                return expr
            };
            
            public test7_cmd4() {
                let expr = "is the knob at the same physical position?";
                return expr
            };
            
            public test8_cmd0() {
                let expr = this.position;
                this.save = expr;
            };
            
            public test8_cmd1() {
                let expr = "note knob's physical position";
                return expr
            };
            
            public test8_cmd2() {
                let expr = "quickly turn counter-clockwise one complete rotation";
                return expr
            };
            
            public test8_cmd3() {
                let expr = this.position == this.save - this.clicks_per_turn;
                return expr
            };
            
            public test8_cmd4() {
                let expr = "is the knob at the same physical position?";
                return expr
            };
            
        }
    }