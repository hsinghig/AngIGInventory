export const ROOT: string = 'https://apiiginventory.azurewebsites.net/api/'

export const INCHES_TO_FEET_MULTIPLIER = 0.083;

export const ROLL_MIN_LENGTH_FILTER = 500;
export const ROLL_MIN_WEIGHT_FILTER = 300;

export const GENERIC_CONSTANTS = [
    { 'url_name': 'URL_GET_ALL_COLORS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Colors/allcolors' },
    { 'url_name': 'URL_GET_ALL_WIDTHS', 'url_value':'https://apiiginventory.azurewebsites.net/api/widths' },    
    { 'url_name': 'URL_GET_USERS_ALL_USERS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Users/allusers' },    
    { 'url_name': 'URL_GET_USERS_BY_ID', 'url_value':'https://apiiginventory.azurewebsites.net/api/Users/' },    
    { 'url_name': 'URL_POST_USERS_ADDUSER', 'url_value':'https://apiiginventory.azurewebsites.net/api/Users/adduser' },
    { 'url_name': 'URL_PUT_USERS_BY_ID', 'url_value':'https://apiiginventory.azurewebsites.net/api/Users/updateUser' },    
    { 'url_name': 'URL_DELETE_USERS_ADDUSER', 'url_value':'https://apiiginventory.azurewebsites.net/api/Users/deleteUser' },
];

export const EXTRUDER_CONSTANTS = [
    { 'url_name': 'URL_GET_EXTRUDER_COLORS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Colors/extrudercolors' },
    { 'url_name': 'URL_GET_EXTRUDER_LOCATIONS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Locations/extruderLocations' },
    { 'url_name': 'URL_POST_EXTRUDER_INSERT', 'url_value':'https://apiiginventory.azurewebsites.net/api/Extruders' },
    { 'url_name': 'URL_GET_EXTRUDER_ALL_DATA', 'url_value':'https://apiiginventory.azurewebsites.net/api/Extruders/GetExtruderData' },
    { 'url_name': 'URL_GET_EXTRUDER_SUMMARY_DATA', 'url_value':'https://apiiginventory.azurewebsites.net/api/Extruders/GetExtruderSummaryData' },
    { 'url_name': 'URL_GET_EXTRUDER_ROLLNUMBER', 'url_value':'https://apiiginventory.azurewebsites.net/api/Extruders/GetRollNumber' }
];

export const CROSSPLY_CONSTANTS = [    
    { 'url_name': 'URL_GET_CROSSPLY_COLORS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Colors/crossplycolors' },  
    { 'url_name': 'URL_GET_CROSSPLY_LOCATIONS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Locations/crossplyLocations' },
    { 'url_name': 'URL_GET_CROSSPLY_ALL_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Crossplys/GetCrossplyData'},
    { 'url_name': 'URL_GET_CROSSPLY_DETAIL_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Crossplys/GetCrossplyDetailData'},
    { 'url_name': 'URL_GET_CROSSPLY_BY_ID', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Crossplys/GetCrossplyById?crossplyId='},
    { 'url_name': 'URL_POST_CROSSPLY_INSERT', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Crossplys'},
    { 'url_name': 'URL_GET_CROSSPLY_SUMMARY_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Crossplys/GetCrossplySummaryData'},
    { 'url_name': 'URL_GET_CROSSPLY_ROLLNUMBER', 'url_value':'https://apiiginventory.azurewebsites.net/api/Crossplys/GetRollNumber' }

];

export const LAMINATION_CONSTANTS = [    
    { 'url_name': 'URL_GET_LAMINATION_COLORS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Colors/crossplycolors' },  
    { 'url_name': 'URL_GET_LAMINATION_LOCATIONS', 'url_value':'https://apiiginventory.azurewebsites.net/api/Locations/laminationLocations' },
    { 'url_name': 'URL_GET_LAMINATION_ALL_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations/GetLaminationData'},
    { 'url_name': 'URL_GET_LAMINATION_DETAIL_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations/GetLaminationDetailData'},
    { 'url_name': 'URL_GET_LAMINATION_BY_ID', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations/GetLaminationsById?laminationId='},
    { 'url_name': 'URL_GET_LAMINATION_BY_REFNUMBER', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations/GetLaminationsByRefNumber?referenceNumber='},
    { 'url_name': 'URL_POST_LAMINATION_INSERT', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations'},
    { 'url_name': 'URL_GET_LAMINATION_SUMMARY_DATA', 'url_value': 'https://apiiginventory.azurewebsites.net/api/Laminations/GetLaminationSummaryData'}
];

export const APP_CONSTANTS_NEW = [
    ...GENERIC_CONSTANTS,
    ...EXTRUDER_CONSTANTS,
    ...CROSSPLY_CONSTANTS,
    ...LAMINATION_CONSTANTS
]

//https://apiiginventory.azurewebsites.net/api/Crossplys/:crossplyId?crossplyId=2
//https://apiiginventory.azurewebsites.net/api/Laminations/:laminationId?laminationId=2