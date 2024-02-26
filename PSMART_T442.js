const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: tuya.fingerprint('TS0002', ['_TZ3000_mufwv0ry']),
    model: 'T442',
    vendor: 'PSMART',
    description: '2 gang switch module',
    extend: tuya.extend.switch({endpoints: ['l1', 'l2'],indicatorMode: true,backlightModeOffOn: true}),
    endpoint: (device) => {
        return {'l1': 1, 'l2': 2};
    },
    meta: {multiEndpoint: true},
    configure: async (device, coordinatorEndpoint, logger) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
    },
};

module.exports = definition;