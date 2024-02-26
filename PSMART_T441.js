const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: tuya.fingerprint('TS0001', ['_TZ3000_myaaknbq']),
    model: 'T441',
    vendor: 'PSMART',
    description: '1 gang switch module',
    extend: tuya.extend.switch({indicatorMode: true,backlightModeOffOn: true}),
    configure: async (device, coordinatorEndpoint, logger) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
    },
};

module.exports = definition;