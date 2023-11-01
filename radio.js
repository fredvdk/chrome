// Play content directly using the "device", to avoid MDNS.
const Device = require("./node_modules/chromecast-api/lib/device");
const ChromecastAPI = require('./node_modules/chromecast-api/index.js')

const host_living = "c4a5e957-ec25-4500-68ce-cdd1f8992e64.local";
const host_keuken = "6095742f-38d2-256a-2777-ce6517ed48b8.local";
//const host_keuken = "192.168.123.200";

const name_living = "JBL-Bar-5.1-Surround-c4a5e957ec25450068cecdd1f8992e64._googlecast._tcp.local";
const name_keuken = "JBL-Link-Portable-6095742f38d2256a2777ce6517ed48b8._googlecast._tcp.local";
//const name_speaker = "Google-Cast-Group-5C93295417A341309F6B91BD9643EC58._googlecast._tcp.local";

const friendlyName_living = "Soundbar";
const friendlyName_keuken = "KeukenBox";
//const friendlyName_groep = "Speaker"

//let opts_groep = { name: name_speaker, friendlyName: friendlyName_groep, host: host_living };
let opts_keuken = { name: name_keuken, friendlyName: friendlyName_keuken, host: host_keuken };
let opts_living = { name: name_living, friendlyName: friendlyName_living, host: host_living };

const channels = [
    { name: 'Radio 1', url: "http://icecast.vrtcdn.be/radio1-high.mp3"},
    { name: 'Radio 2', url : "http://icecast.vrtcdn.be/ra2wvl-high.mp3" }
]

const devices = [
    { name: 'Keuken', device: new Device(opts_keuken), status: {}, volume: 0 },
    { name: 'Living', device: new Device(opts_living), status: {}, volume: 0 }
]

for (let d of devices) {
    d.device.on('status', (status)=>{
        d.status = status;
        console.log(d.name + " status changed");
    });
}

function play(deviceName, channel, volume){
    _getDevice(deviceName).play(_getUrl(channel), (err)=>{
        setVolume(deviceName, volume);
    });
    return "Playing " + channel + " on " + deviceName +  " - Volume 20 pct";
}

function setVolume(naam, volume){
    console.log("Setting " + naam + " volume to " + volume);
    _getDevice(naam).setVolume(volume/100, ()=> {
        console.log("Volume set: " + naam + " - " + volume);

    });
}

function stop(room){
    _getDevice(room).stop(()=>{ console.log("device stopped - " + room)})
}

function _getDevice(room){
    return devices.find((device)=>device.name == room).device
}

function _getUrl(name){
    return channels.find((channel)=>channel.name == name).url;
}

function getInfoOnDevices(){
    let output = [];
    for (let d of devices) output.push(d.status);
    return JSON.stringify(output);
}

function getVolumes(){

    return devices;
}

module.exports = { getVolumes, getInfoOnDevices, stop, play, setVolume, channels, devices };





  

 

 

