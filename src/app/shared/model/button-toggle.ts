export interface ButtonToggle {
    value: string, label: string
}
export const EXTRUDER_COLOR_TOGGLE_LIST: ButtonToggle[] = [
    { value: 'black', label: 'black' },
    { value: 'blue', label: 'blue' },
    { value: 'green', label: 'green' },
    { value: 'purple', label: 'purple' },
    { value: 'yellow', label: 'yellow' }];
    
export const EXTRUDER_WIDTH_TOGGLE_LIST: ButtonToggle[] = [
    { value: '87', label: '87' },
    { value: '93', label: '93' },
    { value: '99', label: '99' },
    { value: '102', label: '102' },
    { value: '105', label: '105' },
    { value: '111', label: '111' },
    { value: '117', label: '117' }];