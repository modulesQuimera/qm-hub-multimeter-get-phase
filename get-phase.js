module.exports = function(RED) {

    "use strict";
    // var serialPool = require("../../serial-template/serial")
    var mapeamentoNode;
    
    function getPhaseNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento 
        this.channel_number = config.channel_number
        this.compare_select = config.compare_select;
        // this.equalTo = config.equalTo;
        this.maxValue = config.maxValue;
        this.minValue = config.minValue;
        var node = this
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var _compare = {};
            // if (node.compare_select == "equalTo") {
            //     _compare = {
            //         voltage_value: {"==": (!isNaN(parseFloat(node.equalTo)))? parseFloat(node.equalTo):node.equalTo }
            //     }
            // }
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
                type: " multimeter_modular_V1.0",
                slot: 1,
                method: "get_phase",
                couple_channel: parseInt(node.channel_number),
                compare: _compare
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("get-phase", getPhaseNode);

    RED.httpAdmin.get("/getPhase",function(req,res) {
        console.log(mapeamentoNode)
        if(mapeamentoNode){
            res.json([
                {value:mapeamentoNode.valuePort1, label: "A1 | IAPW - " + mapeamentoNode.labelPort1, hasValue:false},
                {value:mapeamentoNode.valuePort2, label: "A2 | IAPW - " + mapeamentoNode.labelPort2, hasValue:false},
                {value:mapeamentoNode.valuePort3, label: "A3 | IAPW - " + mapeamentoNode.labelPort3, hasValue:false},
                {value:mapeamentoNode.valuePort4, label: "A4 | IAPW - " + mapeamentoNode.labelPort4, hasValue:false},
                {value:mapeamentoNode.valuePort5, label: "A5 | IAPW - " + mapeamentoNode.labelPort5, hasValue:false},
                {value:mapeamentoNode.valuePort6, label: "A6 | IAPW - " + mapeamentoNode.labelPort6, hasValue:false},
                {value:mapeamentoNode.valuePort7, label: "A7 | IAPW - " + mapeamentoNode.labelPort7, hasValue:false},
                {value:mapeamentoNode.valuePort8, label: "A8 | IAPW - " + mapeamentoNode.labelPort8, hasValue:false},
                {value:mapeamentoNode.valuePort9, label: "A9 | IAPW - " + mapeamentoNode.labelPort9, hasValue:false},
                {value:mapeamentoNode.valuePort10, label: "A10 | IAPW - " + mapeamentoNode.labelPort10, hasValue:false},
                {value:mapeamentoNode.valuePort11, label: "A11 | IAPW - " + mapeamentoNode.labelPort11, hasValue:false},
                {value:mapeamentoNode.valuePort12, label: "APW | IAPW - " + mapeamentoNode.labelPort12, hasValue:false},
                {value:mapeamentoNode.valuePort13, label: "AMX | IAPW - " + mapeamentoNode.labelPort13, hasValue:false},
                {value:mapeamentoNode.valuePort14, label: "B1 | IBPW - " + mapeamentoNode.labelPort14, hasValue:false},
                {value:mapeamentoNode.valuePort15, label: "B2 | IBPW - " + mapeamentoNode.labelPort15, hasValue:false},
                {value:mapeamentoNode.valuePort16, label: "B3 | IBPW - " + mapeamentoNode.labelPort16, hasValue:false},
                {value:mapeamentoNode.valuePort17, label: "B4 | IBPW - " + mapeamentoNode.labelPort17, hasValue:false},
                {value:mapeamentoNode.valuePort18, label: "B5 | IBPW - " + mapeamentoNode.labelPort18, hasValue:false},
                {value:mapeamentoNode.valuePort19, label: "B6 | IBPW - " + mapeamentoNode.labelPort19, hasValue:false},
                {value:mapeamentoNode.valuePort20, label: "B7 | IBPW - " + mapeamentoNode.labelPort20, hasValue:false},
                {value:mapeamentoNode.valuePort21, label: "B8 | IBPW - " + mapeamentoNode.labelPort21, hasValue:false},
                {value:mapeamentoNode.valuePort22, label: "B9 | IBPW - " + mapeamentoNode.labelPort22, hasValue:false},
                {value:mapeamentoNode.valuePort23, label: "B10 | IBPW - " + mapeamentoNode.labelPort23, hasValue:false},
                {value:mapeamentoNode.valuePort24, label: "B11 | IBPW - " + mapeamentoNode.labelPort24, hasValue:false},
                {value:mapeamentoNode.valuePort25, label: "BPW | IBPW - " + mapeamentoNode.labelPort25, hasValue:false},
                {value:mapeamentoNode.valuePort26, label: "BMX | IBPW - " + mapeamentoNode.labelPort26, hasValue:false},
                {value:mapeamentoNode.valuePort27, label: "CPW | ICPW - " + mapeamentoNode.labelPort27, hasValue:false},
            ])
        }
        else{
            res.json([
                {label:"A1 | IAPWA1 - ", value: "0", hasValue:false},
                {label:"A2 | IAPW - ", value: "1", hasValue:false},
                {label:"A3 | IAPW - ", value: "2", hasValue:false},
                {label:"A4 | IAPW - ", value: "3", hasValue:false},
                {label:"A5 | IAPW - ", value: "4", hasValue:false},
                {label:"A6 | IAPW - ", value: "5", hasValue:false},
                {label:"A7 | IAPW - ", value: "6", hasValue:false},
                {label:"A8 | IAPW - ", value: "7", hasValue:false},
                {label:"A9 | IAPW - ", value: "8", hasValue:false},
                {label:"A10 | IAPW - ", value: "9", hasValue:false},
                {label:"A11 | IAPW - ", value: "10", hasValue:false},
                {label:"APW | IAPW - ", value: "11", hasValue:false},
                {label:"AMX | IAPW - ", value: "12", hasValue:false},
                {label:"B1 | IBPW - ", value: "13", hasValue:false},
                {label:"B2 | IBPW - ", value: "14", hasValue:false},
                {label:"B3 | IBPW - ", value: "15", hasValue:false},
                {label:"B4 | IBPW - ", value: "16", hasValue:false},
                {label:"B5 | IBPW - ", value: "17", hasValue:false},
                {label:"B6 | IBPW - ", value: "18", hasValue:false},
                {label:"B7 | IBPW - ", value: "19", hasValue:false},
                {label:"B8 | IBPW - ", value: "20", hasValue:false},
                {label:"B9 | IBPW - ", value: "21", hasValue:false},
                {label:"B10 | IBPW - ", value: "22", hasValue:false},
                {label:"B11 | IBPW - ", value: "23", hasValue:false},
                {label:"BPW | IBPW - ", value: "24", hasValue:false},
                {label:"BMX | IBPW - ", value: "25", hasValue:false},
                {label:"CPW | ICPW - ", value: "26", hasValue:false},
            ])
        }
    });
}