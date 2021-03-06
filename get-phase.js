module.exports = function(RED) {

    // "use strict";
    // var serialPool = require("../../serial-template/serial")
    var mapeamentoNode;
    
    function multipleGetPhase(self, file, slot, currentMode){
        for(var t=0; t<self.qtdGetPhase; t++){
            var _compare_n = {};
            if (self.compare_select_n[t] == "interval") {
                _compare_n = {
                    phase_degrees: {">=": parseFloat(self.minValue_n[t]), "<=": parseFloat(self.maxValue_n[t])}
                };
            }
            if (self.compare_select_n[t] == "maxValue") {
                _compare_n = {
                    phase_degrees: {">=": null, "<=": parseFloat(self.maxValue_n[t])}
                };
            }
            if (self.compare_select_n[t] == "minValue") {
                _compare_n = {
                    phase_degrees: {">=": parseFloat(self.minValue_n[t]), "<=": null}
                };
            }
            var command_n={
                type: "multimeter_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "get_phase",
                couple_channel: parseInt(self.channel_number_n[t]),
                compare: _compare_n,
                get_output: {},
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }


    function getPhaseNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento 
        this.channel_number = config.channel_number
        this.compare_select = config.compare_select;
        // this.equalTo = config.equalTo;
        this.maxValue = config.maxValue;
        this.minValue = config.minValue;
        

        this.qtdGetPhase = config.qtdGetPhase;
        this.channel_number_n=[]; this.compare_select_n=[]; this.maxValue_n=[]; this.minValue_n=[];
        this.channel_number_n.push(config.channel_number1); this.compare_select_n.push(config.compare_select1); this.maxValue_n.push(config.maxValue1); this.minValue_n.push(config.minValue1);
        this.channel_number_n.push(config.channel_number2); this.compare_select_n.push(config.compare_select2); this.maxValue_n.push(config.maxValue2); this.minValue_n.push(config.minValue2);
        this.channel_number_n.push(config.channel_number3); this.compare_select_n.push(config.compare_select3); this.maxValue_n.push(config.maxValue3); this.minValue_n.push(config.minValue3);
        this.channel_number_n.push(config.channel_number4); this.compare_select_n.push(config.compare_select4); this.maxValue_n.push(config.maxValue4); this.minValue_n.push(config.minValue4);
        this.channel_number_n.push(config.channel_number5); this.compare_select_n.push(config.compare_select5); this.maxValue_n.push(config.maxValue5); this.minValue_n.push(config.minValue5);
        this.channel_number_n.push(config.channel_number6); this.compare_select_n.push(config.compare_select6); this.maxValue_n.push(config.maxValue6); this.minValue_n.push(config.minValue6);
        this.channel_number_n.push(config.channel_number7); this.compare_select_n.push(config.compare_select7); this.maxValue_n.push(config.maxValue7); this.minValue_n.push(config.minValue7);
        this.channel_number_n.push(config.channel_number8); this.compare_select_n.push(config.compare_select8); this.maxValue_n.push(config.maxValue8); this.minValue_n.push(config.minValue8);
        this.channel_number_n.push(config.channel_number9); this.compare_select_n.push(config.compare_select9); this.maxValue_n.push(config.maxValue9); this.minValue_n.push(config.minValue9);
        this.channel_number_n.push(config.channel_number10); this.compare_select_n.push(config.compare_select10); this.maxValue_n.push(config.maxValue10); this.minValue_n.push(config.minValue10);
        this.channel_number_n.push(config.channel_number11); this.compare_select_n.push(config.compare_select11); this.maxValue_n.push(config.maxValue11); this.minValue_n.push(config.minValue11);
        this.channel_number_n.push(config.channel_number12); this.compare_select_n.push(config.compare_select12); this.maxValue_n.push(config.maxValue12); this.minValue_n.push(config.minValue12);
        this.channel_number_n.push(config.channel_number13); this.compare_select_n.push(config.compare_select13); this.maxValue_n.push(config.maxValue13); this.minValue_n.push(config.minValue13);
        this.channel_number_n.push(config.channel_number14); this.compare_select_n.push(config.compare_select14); this.maxValue_n.push(config.maxValue14); this.minValue_n.push(config.minValue14);
        this.channel_number_n.push(config.channel_number15); this.compare_select_n.push(config.compare_select15); this.maxValue_n.push(config.maxValue15); this.minValue_n.push(config.minValue15);
        this.channel_number_n.push(config.channel_number16); this.compare_select_n.push(config.compare_select16); this.maxValue_n.push(config.maxValue16); this.minValue_n.push(config.minValue16);
        this.channel_number_n.push(config.channel_number17); this.compare_select_n.push(config.compare_select17); this.maxValue_n.push(config.maxValue17); this.minValue_n.push(config.minValue17);
        this.channel_number_n.push(config.channel_number18); this.compare_select_n.push(config.compare_select18); this.maxValue_n.push(config.maxValue18); this.minValue_n.push(config.minValue18);
        this.channel_number_n.push(config.channel_number19); this.compare_select_n.push(config.compare_select19); this.maxValue_n.push(config.maxValue19); this.minValue_n.push(config.minValue19);
        this.channel_number_n.push(config.channel_number20); this.compare_select_n.push(config.compare_select20); this.maxValue_n.push(config.maxValue20); this.minValue_n.push(config.minValue20);
        this.channel_number_n.push(config.channel_number21); this.compare_select_n.push(config.compare_select21); this.maxValue_n.push(config.maxValue21); this.minValue_n.push(config.minValue21);
        this.channel_number_n.push(config.channel_number22); this.compare_select_n.push(config.compare_select22); this.maxValue_n.push(config.maxValue22); this.minValue_n.push(config.minValue22);
        this.channel_number_n.push(config.channel_number23); this.compare_select_n.push(config.compare_select23); this.maxValue_n.push(config.maxValue23); this.minValue_n.push(config.minValue23);
        this.channel_number_n.push(config.channel_number24); this.compare_select_n.push(config.compare_select24); this.maxValue_n.push(config.maxValue24); this.minValue_n.push(config.minValue24);

        var node = this
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var _compare = {};
            if (node.compare_select == "interval") {
                _compare = {
                    phase_degrees: {">=": parseFloat(node.minValue), "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "maxValue") {
                _compare = {
                    phase_degrees: {">=": null, "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "minValue") {
                _compare = {
                    phase_degrees: {">=": parseFloat(node.minValue), "<=": null}
                }
            }

            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: " multimeter_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "get_phase",
                couple_channel: parseInt(node.channel_number),
                compare: _compare,
                get_output: {},
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleGetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleGetPhase(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleGetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleGetPhase(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            send(msg)
        });
    }
    RED.nodes.registerType("get-phase", getPhaseNode);
}