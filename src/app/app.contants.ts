export const ROOT: string = 'https://apiiginventory.azurewebsites.net/api/'
// export const APP_CONSTANTS = [
//     { 'url_name': 'URL_GET_ALL_COLORS', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Colors/allcolors' },
//     { 'url_name': 'URL_GET_EXTRUDER_COLORS', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Colors/extrudercolors' },
//     { 'url_name': 'URL_GET_CROSSPLY_COLORS', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Colors/crossplycolors' },  

//     { 'url_name': 'URL_GET_LOCATIONS_EXTRUDER', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Locations/extruderLocations' },
//     { 'url_name': 'URL_GET_LOCATIONS_CROSSPLY', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Locations/crossplyLocations' },
  
//     { 'url_name': 'URL_GET_WIDTHS', 'url_value': 'https://apiiginventory.azurewebsites.net/api/widths' },    

//     { 'url_name': 'URL_GET_USERS_ALL_USERS', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Users/allusers' },    
//     { 'url_name': 'URL_GET_USERS_BY_ID', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Users/' },    
//     { 'url_name': 'URL_POST_USERS_ADDUSER', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Users/adduser' },

//     { 'url_name': 'URL_PUT_USERS_BY_ID', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Users/updateUser' },    
//     { 'url_name': 'URL_DELETE_USERS_ADDUSER', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Users/deleteUser' },

//     { 'url_name': 'URL_EXTRUDER_INSERT', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Extruder' },
//     { 'url_name': 'URL_EXTRUDER_GET_EXTRUDER_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Extruder/GetExtruderData' },
//     { 'url_name': 'URL_EXTRUDER_GET_SUMMARY_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Extruder/GetExtruderSummaryData' }    
    
// ];
export const GENERIC_CONSTANTS = [
    { 'url_name': 'URL_GET_ALL_COLORS', 'url_value': ROOT +  'Colors/allcolors' },
    { 'url_name': 'URL_GET_ALL_WIDTHS', 'url_value': ROOT + 'widths' },    
    { 'url_name': 'URL_GET_USERS_ALL_USERS', 'url_value': ROOT + 'Users/allusers' },    
    { 'url_name': 'URL_GET_USERS_BY_ID', 'url_value': ROOT + 'Users/' },    
    { 'url_name': 'URL_POST_USERS_ADDUSER', 'url_value': ROOT + 'Users/adduser' },
    { 'url_name': 'URL_PUT_USERS_BY_ID', 'url_value': ROOT + 'Users/updateUser' },    
    { 'url_name': 'URL_DELETE_USERS_ADDUSER', 'url_value': ROOT + 'Users/deleteUser' },
];

export const EXTRUDER_CONSTANTS = [
    { 'url_name': 'URL_GET_EXTRUDER_COLORS', 'url_value': ROOT + 'Colors/extrudercolors' },
    { 'url_name': 'URL_GET_EXTRUDER_LOCATIONS', 'url_value': ROOT + 'Locations/extruderLocations' },
    { 'url_name': 'URL_POST_EXTRUDER_INSERT', 'url_value': ROOT + 'Extruder' },
    { 'url_name': 'URL_GET_EXTRUDER_ALL_DATA', 'url_value': ROOT + 'Extruder/GetExtruderData' },
    { 'url_name': 'URL_GET_EXTRUDER_SUMMARY_DATA', 'url_value': ROOT + 'Extruder/GetExtruderSummaryData' },
    { 'url_name': 'URL_GET_EXTRUDER_ROLLNUMBER', 'url_value': ROOT + 'Extruder/GetRollNumber' }
];

export const CROSSPLY_CONSTANTS = [    
    { 'url_name': 'URL_GET_CROSSPLY_COLORS', 'url_value': ROOT +  'Colors/crossplycolors' },  
    { 'url_name': 'URL_GET_CROSSPLY_LOCATIONS', 'url_value': ROOT +  'Locations/crossplyLocations' },
];

export const APP_CONSTANTS_NEW = [
    ...GENERIC_CONSTANTS,
    ...EXTRUDER_CONSTANTS,
    ...CROSSPLY_CONSTANTS
]