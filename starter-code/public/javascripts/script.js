document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let password = $('#myPassword')
console.log('password', password)

$(document).ready(function($) {
    console.log(`inside querry`);
    
    
    $('#myPassword').strength({
      strengthClass: 'strength',
      strengthMeterClass: 'strength_meter',
      strengthButtonClass: 'button_strength',
      strengthButtonText: 'Show password',
      strengthButtonTextToggle: 'Hide Password'
  }); 
  });

  console.log(`COUOCUOCUOCU`);
  
