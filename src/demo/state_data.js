function getRandomTime() {
  let ts = new Date(new Date().getTime() - (Math.random() * 80 * 60 * 1000));
  return `${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()} ` +
         `${ts.getDate()}-${ts.getMonth()+1}-${ts.getFullYear()}`;
}

export default [
    {
        "attributes": {
            "brightness": 200,
            "xy_color": [
                0.6389,
                0.3028
            ]
        },
        "entity_id": "light.ceiling",
        "last_changed": getRandomTime(),
        "state": "on"
    },
    {
        "attributes": {
            "entity_picture": "https://graph.facebook.com/KillBillMovie/picture",
            "friendly_name": "Media Player"
        },
        "entity_id": "media_player.living_room",
        "last_changed": getRandomTime(),
        "state": "Plex"
    },
    {
        "attributes": {
            "friendly_name": "Outside humidity",
            "unit_of_measurement": "%"
        },
        "entity_id": "sensor.outside_humidity",
        "last_changed": getRandomTime(),
        "state": "54"
    },
    {
        "attributes": {
            "friendly_name": "Kodi",
        },
        "entity_id": "sensor.kodi",
        "last_changed": getRandomTime(),
        "state": "on"
    },
    {
        "attributes": {
            "friendly_name": "Outside temperature",
            "unit_of_measurement": "\u00b0C"
        },
        "entity_id": "sensor.outside_temperature",
        "last_changed": getRandomTime(),
        "state": "15.6"
    },
    {
        "attributes": {
            "auto": true,
            "entity_id": [
                "device_tracker.Paulus",
                "device_tracker.Anne_Therese"
            ]
        },
        "entity_id": "group.all_devices",
        "last_changed": getRandomTime(),
        "state": "home"
    },
    {
        "attributes": {},
        "entity_id": "light.bed_light",
        "last_changed": getRandomTime(),
        "state": "off"
    },
    {
        "attributes": {
            "auto": true,
            "entity_id": [
                "light.bowl",
                "light.ceiling",
                "light.tv_back_light",
                "light.bed_light"
            ],
            "friendly_name": "all lights"
        },
        "entity_id": "group.all_lights",
        "last_changed": getRandomTime(),
        "state": "on"
    },
    {
        "attributes": {
            "brightness": 200,
            "xy_color": [
                0.6389,
                0.3028
            ]
        },
        "entity_id": "light.bowl",
        "last_changed": getRandomTime(),
        "state": "on"
    },
    {
        "attributes": {
            "away_mode": "off",
            "current_temperature": "18",
            "unit_of_measurement": "\u00b0C"
        },
        "entity_id": "thermostat.nest",
        "last_changed": getRandomTime(),
        "state": "23"
    },
    {
        "attributes": {},
        "entity_id": "a.demo_mode",
        "last_changed": getRandomTime(),
        "state": "Enabled"
    },
    {
        "attributes": {
            "next_rising": "06:37:32 09-02-2015",
            "next_setting": "17:29:01 09-02-2015"
        },
        "entity_id": "sun.sun",
        "last_changed": getRandomTime(),
        "state": "below_horizon"
    },
    {
        "attributes": {
            "configure_id": "4415244496-1",
            "description": "Press the button on the bridge to register Philips Hue with Home Assistant.",
            "description_image": "/demo/images/config_philips_hue.jpg",
            "fields": [],
            "submit_caption": "I have pressed the button"
        },
        "entity_id": "configurator.philips_hue",
        "last_changed": getRandomTime(),
        "state": "configure"
    },
    {
        "attributes": {},
        "entity_id": "switch.christmas_lights",
        "last_changed": getRandomTime(),
        "state": "off"
    },
    {
        "attributes": {
            "auto": false,
            "entity_id": [
                "light.bed_light",
                "switch.christmas_lights"
            ],
            "friendly_name": "bedroom"
        },
        "entity_id": "group.bedroom",
        "last_changed": getRandomTime(),
        "state": "off"
    },
    {
        "attributes": {"friendly_name": "TV Back Light"},
        "entity_id": "light.tv_back_light",
        "last_changed": getRandomTime(),
        "state": "off"
    },
    {
        "attributes": {
            "auto": false,
            "entity_id": [
                "light.bowl",
                "light.ceiling",
                "light.tv_back_light",
                "switch.ac"
            ],
            "friendly_name": "living room"
        },
        "entity_id": "group.living_room",
        "last_changed": getRandomTime(),
        "state": "on"
    },
    {
        "attributes": {
            "entity_picture": "https://graph.facebook.com/297400035/picture"
        },
        "entity_id": "device_tracker.paulus",
        "last_changed": getRandomTime(),
        "state": "home"
    },
    {
        "attributes": {
            "entity_picture": "https://graph.facebook.com/621994601/picture"
        },
        "entity_id": "device_tracker.anne_therese",
        "last_changed": getRandomTime(),
        "state": "not_home"
    },
    {
        "attributes": {
            "friendly_name": "AC",
        },
        "entity_id": "switch.ac",
        "last_changed": getRandomTime(),
        "state": "on"
    }
];
