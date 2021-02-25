
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
                return "turn the knob back and forth"
            };
            
            public test0_cmd1() {
                return 
            };
            
            public test1_cmd0() {
                return this.position
            };
            
            public test1_cmd1() {
                return "turn knob clockwise"
            };
            
            public test1_cmd2() {
                return this.position > this.save
            };
            
            public test2_cmd0() {
                return this.position
            };
            
            public test2_cmd1() {
                return "turn knob counter-clockwise"
            };
            
            public test2_cmd2() {
                return this.position < this.save
            };
            
            public test3_cmd0() {
                return this.position
            };
            
            public test3_cmd1() {
                return "turn one complete rotation clockwise"
            };
            
            public test3_cmd2() {
                return this.position == this.save + this.clicks_per_turn
            };
            
            public test4_cmd0() {
                return this.position
            };
            
            public test4_cmd1() {
                return "turn one complete rotation counter-clockwise"
            };
            
            public test4_cmd2() {
                return this.position == this.save - this.clicks_per_turn
            };
            
            public test5_cmd0() {
                return this.position
            };
            
            public test5_cmd1() {
                return "slowly turn clockwise one complete rotation"
            };
            
            public test5_cmd2() {
                return [ this.save , this.save + this.clicks_per_turn ]
            };
            
            public test6_cmd0() {
                return this.position
            };
            
            public test6_cmd1() {
                return "slowly turn counter-clockwise one complete rotation"
            };
            
            public test6_cmd2() {
                return [ this.save , this.save - this.clicks_per_turn ]
            };
            
            public test7_cmd0() {
                return this.position
            };
            
            public test7_cmd1() {
                return "note knob's physical position"
            };
            
            public test7_cmd2() {
                return "quickly turn clockwise one complete rotation"
            };
            
            public test7_cmd3() {
                return this.position == this.save + this.clicks_per_turn
            };
            
            public test7_cmd4() {
                return "is the knob at the same physical position?"
            };
            
            public test8_cmd0() {
                return this.position
            };
            
            public test8_cmd1() {
                return "note knob's physical position"
            };
            
            public test8_cmd2() {
                return "quickly turn counter-clockwise one complete rotation"
            };
            
            public test8_cmd3() {
                return this.position == this.save - this.clicks_per_turn
            };
            
            public test8_cmd4() {
                return "is the knob at the same physical position?"
            };
            
        }
    }